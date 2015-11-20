'use strict';

var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

function createEntryWithDateAndText (username, from, to, time, request, smoking, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username, time, from, to, request, smoking ];
    var query = 'INSERT into entries (entryuser, entrytime, entryfrom, entryto, request,smoking) VALUES($1, $2, $3,$4, $5, $6)';
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

module.exports.createEntry = function createEntry (username,  from, to, time, request, smoking, cb) {
  createEntryWithDateAndText(username, from, to, time, request, smoking, cb);
};

module.exports.listEntries = function listEntries (cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = 'SELECT * FROM entries ORDER BY entrytime desc LIMIT 20';
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
