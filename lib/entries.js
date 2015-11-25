'use strict';


var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

function createEntryWithDateAndText (username, from, to, time, request, smoking, phone, email, klukka, annad, seats, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username, time, from, to, request, smoking, email, klukka, annad, seats, phone ];
    var query = 'INSERT into entries (entryuser, entrytime, entryfrom, entryto, request,smoking, entryemail, entryklukka, entryfleira, entryseats, entryphone) VALUES($1, $2, $3,$4, $5, $6, $7, $8, $9, $10, $11)';
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

function changeEntryWithDateAndText (id, username, from, to, time, request, smoking, phone, email, klukka, annad, seats, cb) {
  console.log('keyrum changeEntryWithDateAndText');
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username, time, from, to, request, smoking, email, klukka, annad, seats, phone, id ];
    console.log('values er:'+values);
    var query = 'UPDATE entries SET entryuser = $1, entrytime =$2, entryfrom=$3, entryto=$4, request=$5,smoking=$6, entryemail=$7, entryklukka=$8, entryfleira=$9, entryseats=$10, entryphone=$11 WHERE entryid=$12';
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




module.exports.createEntry = function createEntry (username,  from, to, time, request, smoking, phone, email, klukka, annad, seats, cb) {
  createEntryWithDateAndText(username, from, to, time, request, smoking, phone, email, klukka, annad, seats, cb);
};

module.exports.changeEntry = function changeEntry (id, username,  from, to, time, request, smoking, phone, email, klukka, annad, seats, cb) {
  console.log('keyrum changeEntry');
  changeEntryWithDateAndText(id, username, from, to, time, request, smoking, phone, email, klukka, annad, seats, cb);
};



module.exports.listEntries = function listEntries (cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    var query = 'SELECT * FROM entries WHERE entrytime>=CURRENT_DATE ORDER BY entrytime';
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

module.exports.deleteEntry = function deleteEntry (id, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [id ];
    var query = 'DELETE from entries where entryid = $1';
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
};
