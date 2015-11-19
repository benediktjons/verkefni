'use strict';

var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

function createEntryWithDateAndText (username, text, cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var values = [username, new Date(), text];
    var query = 'INSERT into entries (entryuser, entrydate, entrytext) VALUES($1, $2, $3)';
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

module.exports.createEntry = function createEntry (username, text, cb) {
  createEntryWithDateAndText(username, text, cb);
};

module.exports.listEntries = function listEntries (cb) {
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }

    var query = 'SELECT * FROM entries ORDER BY entrydate desc LIMIT 20';
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
