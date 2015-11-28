'use strict';


var pg = require('pg');

var DATABASE = process.env.DATABASE_URL;

//Búum til færslu með ýmsum breytum
function createEntryWithDateAndText (username, from, to, time, request, smoking, phone, email, klukka, annad, seats, cb) {
    //tengjumst gagnagrunninum
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    //Setjum gildin sem við tökum inn í vigur
    var values = [username, time, from, to, request, smoking, email, klukka, annad, seats, phone ];
    //Búum til SQL skipun sem vistar gögnin í gagnagrunninum
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

//Búum til fall sem breytir gildum á færslu
function changeEntryWithDateAndText (id, username, from, to, time, request, smoking, phone, email, klukka, annad, seats, cb) {
  //tengjumst gagnagrunninum
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    //setjum gildin sem við tökum inn í vigur
    console.log('hér kemur email í entries.js');
    console.log(email);
    var values = [username, time, from, to, request, smoking, email, klukka, annad, seats, phone, id ];
    //Búum til SQL skipun sem breytir gilunum í gagnagrunninum
    var query = 'UPDATE entries SET entryuser = $1, entrytime =$2, entryfrom=$3, entryto=$4, request=$5,smoking=$6, entryemail=$7, entryklukka=$8, entryfleira=$9, entryseats=$10, entryphone=$11 WHERE entryid=$12';
    //sendum skipunina í SQLið
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



//Búum til föll sem flytja út föllin hér að ofan, svo við getum notað þau í auth.js skránni
module.exports.createEntry = function createEntry (username,  from, to, time, request, smoking, phone, email, klukka, annad, seats, cb) {
  createEntryWithDateAndText(username, from, to, time, request, smoking, phone, email, klukka, annad, seats, cb);
};

module.exports.changeEntry = function changeEntry (id, username,  from, to, time, request, smoking, phone, email, klukka, annad, seats, cb) {
  console.log('keyrum changeEntry');
  changeEntryWithDateAndText(id, username, from, to, time, request, smoking, phone, email, klukka, annad, seats, cb);
};


//Búum hér til fall sem ´sækir listann af færslum í gagnagrunninn
//exportum því svo við getum notað það í auth.js
module.exports.listEntries = function listEntries (cb) {
  //tengjumst gagnagrunni
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    //búum til SQL skipun sem nær í allar færslur sem ekki eru úreltar
    //og færslurnar eru i röð eftir dagssetningu
    var query = 'SELECT * FROM entries WHERE entrytime>=CURRENT_DATE ORDER BY entrytime';
    //framkvæmum sql skipunina
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
//Búum til fall sem tekur inn auðkenni færslu og eyðir henni úr gagnagrunninum
//exportum því svo við getum notað það í auth.js
module.exports.deleteEntry = function deleteEntry (id, cb) {
  //Tengjumst gagnagrunni
  pg.connect(DATABASE, function (error, client, done) {
    if (error) {
      return cb(error);
    }
    //setjum auðkenni í vigur
    var values = [id ];
    //Búum til SQL skipun sem eyðir færslunni með auðkenninu sem við tókum inn
    var query = 'DELETE from entries where entryid = $1';
    //framkvæmum sql skipunina
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
