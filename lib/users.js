'use strict';

var hash = require('../lib/pass').hash;
var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

function createUserWithHashAndSalt (username, email, phone, salt, hash, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username, salt, hash, email, phone ];
    var query = 'INSERT into users (username, salt, hash, useremail, userphone) VALUES($1, $2, $3, $4, $5)';
    client.query(query, values, function (err) {
      done();

      if (err) {
        console.error(err);
        return cb(error);
      } else {
        return cb(null, true);
      }
    });
  });
}

function findUser (username, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username];
    var query = 'SELECT username, useremail, userphone, salt, hash FROM users WHERE username = $1';
    client.query(query, values, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
}

module.exports.createUser = function createUser (username, password, email, phone, cb) {
  hash(password, function (err, salt, hash) {
    if (err) {
      return cb(err);
    }

    createUserWithHashAndSalt(username, email, phone, salt, hash, cb);
  });
};

module.exports.listUsers = function listUsers (cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = 'SELECT username FROM users LIMIT 20';
    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};

module.exports.listEntries = function listEntries (cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = 'SELECT entryuser, entrytext, entrydate FROM entries ORDER BY entrydate desc LIMIT 10';
    client.query(query, function (err, result) {
      done();

      if (err) {
        return cb(error);
      } else {
        return cb(null, result.rows);
      }
    });
  });
};




module.exports.auth = function auth (name, pass, fn) {
  findUser(name, function (err, result) {
    var user = null;

    if (result.length === 1) {
      user = result[0];
    }

    if (!user) {
      return fn(new Error('cannot find user'));
    }

    hash(pass, user.salt, function(err, hash){
      if (err) {
        return fn(err);
      }

      if (hash === user.hash) {
        return fn(null, user);
      }

      fn(new Error('invalid password'));
    });
  });
};