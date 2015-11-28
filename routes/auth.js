'use strict';
console.log("auth");

var express = require('express');
var router = express.Router();
var xss = require('xss');

var validate = require('../lib/validate');
var users = require('../lib/users');
var entries = require('../lib/entries');

//get og post fyrir um okkur síðuna
router.get('/about', aboutUs);
//Get og post fyrir 'búa til nýja færslu' síðuna
router.get('/createride',ensureLoggedIn, write);
router.post('/createride', entryHandler);
//change, breyta færslu síðan
router.get('/change', ensureLoggedIn, change);
router.post('/change', changeEntryHandler);
//login síðan
router.get('/login', redirectIfLoggedIn, login);
router.post('/login', loginHandler);

router.get('/logout', logout);
//Búa til nýjan notanda síðan
router.get('/create', createForm);
router.post('/create', createHandler);
//Notandi fer á þessa síðu ef hann reynir að fara inn á login
//síðuna þegar hann er skráður inn
router.get('/redirect', redirect);

module.exports = router;

function aboutUs(req, res) {
  var username = req.session.user;
  res.render('about', { title: 'Um Samfó', user:username});
}
function createForm(req, res) {
  var data={title: 'Nýskráning'};
  console.log(data);
  console.log('data.title:'+data.title);
  var username={val:'',valid:true};
  var password={val: '', valid:true};
  var password2={val:'', valid:true};
  var email={val: '', valid:true};
  var phone={val: '', valid:true};

  data.username= username;
  data.email=email;
  data.phone=phone;
  data.password=password;
  data.password2=password2;
  res.render('create', data);
}

function createHandler(req, res) {
  var data={title: 'Nýskráning'};
  var email={val: '', valid:true};
  var phone={val: '', valid:true};
  data.email=email;
  data.phone=phone;

  var username = xss(req.body.username);
  var password = xss(req.body.password);
  var password2 = xss(req.body.password2);

  var validCheckPw = validate.password(password,password2);
  var validUser = validate.length(username, 2);
  var validPw = validate.length(password, 5);

  data.username={
    val:username,
    valid: validUser
  };

  data.password={
    val:'',
    valid:(validPw)
  };
   data.password2={
    val:'',
    valid:(validCheckPw)
  };

  email = xss(req.body.email);
  var validEmail = validate.isEmail(email);
  data.email = {
    val:email,
    valid: validEmail
  };
  phone = xss(req.body.phone);
  var validPh = validate.phonenumber(phone);
  data.phone={
    val:phone,
    valid:validPh
  };

  var allTrue = (
    data.username.valid &&
    data.email.valid &&
    data.password.valid &&
    data.password2.valid &&
    data.phone.valid
  );

  if(allTrue){
    users.createUser(username, password, email, phone, function (err, status) {
      if (err) {
        console.error(err);
      }

      var success = true;
      var error='';
      if (err || !status) {
        success = false;
        error= 'Villa við að útbúa notanda';
        res.render('create', { title: 'Nýskráning', post: true, error: error, success: success });
      }
      else{
        var data={ title: 'Skráðu þig inn', post: true, error: error,newuser:true, success: success };
        data.username={val:''};
        res.render('login', data);
      }
    });
  }
  else{
    console.log('Else: Data er:'+data);
    res.render('create',data);
  }
}

function entryHandler(req,res){
  var data={title: 'Skrá ferð'};
  console.log('Keyri entryHandler');
  var username = req.session.user;
  var from = xss(req.body.from);
  var to = xss(req.body.to);
  var date = xss(req.body.date);
  var ride = xss(req.body.request);
  var smoking = xss(req.body.smoking);
  var klukka = xss(req.body.klukka);
  var annad = xss(req.body.textarea);
  var seats = xss(req.body.seats);


  //validate-um gogninn sem vid faum inn
  var validFrom = validate.isPlace(from);
  var validTo = validate.isPlace(to);
  var validRequest = validate.request(ride);
  var validnumberOfSeats = validate.numberOfSeats(seats);
  var validDate= validate.checkDate(date);
  var validClock= validate.checkClock(klukka);


  data.ride={
    val:ride,
    valid:validRequest
  };
  data.seats={
    val:seats,
    valid:(validnumberOfSeats)
  };

  data.dags={
    val:date,
    valid:validDate
  };
  data.time = {
    val:klukka,
    valid: validClock
  };
  data.txt={
    val:annad,
    valid:true
  };
  var allTrue = (
    validFrom &&
    validTo &&
    validRequest &&
    validnumberOfSeats &&
    validDate &&
    validClock
  );
  if (allTrue){
    date = date.slice(6,10)+'-'+date.slice(3,5)+'-'+date.slice(0,2);

    entries.createEntry(username.username,
      from,
      to,
      date,
      ride,
      smoking,
      username.userphone,
      username.useremail,
      klukka,
      annad,
      seats,
      function(err, status){
        if (err){
          console.error(err);
        }

        var success = true;

        if (err || !status){
          success = false;
        }

        res.redirect('/#s2');
      });
  }
  else{
    res.render('writeOnWall',data);
  }
}

function changeEntryHandler(req,res){
  var id = xss(req.body.myid);
  var username = req.session.user;
  var from = xss(req.body.from);
  var to = xss(req.body.to);
  var date = xss(req.body.date);
  var request = xss(req.body.request);
  var smoking = xss(req.body.smoking);
  var klukka = xss(req.body.klukka);
  var annad = xss(req.body.textarea);
  var seats = xss(req.body.seats);


  //validate-um gogninn sem vid faum inn
  var validFrom = validate.isPlace(from);
  var validTo = validate.isPlace(to);
  var validRequest = validate.request(request);
  var validnumberOfSeats = validate.numberOfSeats(seats);
  var validDate= validate.checkDate(date);
  var validClock= validate.checkClock(klukka);

  if(!validFrom){
    //villumedhondlun
    res.render('change', {title: 'Hvert á að fara?',
      success: false,
      post: true,
      error: 'Villa: Ath. að velja þarf möguleika úr Frá boxinu.'
    });
  }

  else if(!validTo){
    //villumedhondlun
    res.render('change', {title: 'Jæja, þarna gerðist eitthvað',
      success: false,
      post: true,
      error: 'Villa: Ath. að velja þarf möguleika úr Til boxinu.'
      });
  }
  else if(!validRequest){
    //villumedhondlun
    res.render('change', {title: 'Skutla?',
      success: false,
      post: true,
      error: 'Villa: Ath. að velja þarf möguleika úr óska eftir boxinu..'
      });
  }
  else if(!validnumberOfSeats){
    //villumedhondlun
    res.render('change', {title: 'Hversu margir?',
      success: false,
      post: true,
      error: 'Villa: Ath. að  velja þarf fjölda sæta úr fjöldi sæta boxinu.'
      });
  }
  else if(!validClock){
    //villumedhondlun
    res.render('change', {title: 'Klukkan?',
      success: false,
      post: true,
      error: 'Villa: Ath. að velja þarf  Klukku..'
      });
  }
  else if(!validDate){
    //villumedhondlun
    res.render('change', {title: 'Hvenær?',
      success: false,
      post: true,
      error: 'Villa: Ath. ertu viss um að þessi dagsetning sé ekki liðin?...'
      });
  }


  else{
    date = date.slice(6,10)+'-'+date.slice(3,5)+'-'+date.slice(0,2);

    entries.changeEntry(id,
      username.username,
      from,
      to,
      date,
      request,
      smoking,
      username.userphone,
      username.useremail,
      klukka,
      annad,
      seats,
      function(err, status){
        if (err){
          console.error(err);
        }

        var success = true;

        if (err || !status){
          success = false;
        }

        res.redirect('/#s2');
      });
  }
}

function ensureLoggedIn(req, res, next) {
  console.log('Ensuring logged in...');
  if (req.session.user) {
    next(); // köllum í næsta middleware ef við höfum notanda
  } else {
    req.session.regenerate(function (){
        req.session.redirected = true;
        res.redirect('/login');
      });
  }
}

function redirectIfLoggedIn(req, res, next) {
  if (req.session.user) {
    res.redirect('/redirect');
  } else {
    next();
  }
}

function login(req, res) {
  var data={title: 'Login'};
  var username={val: ''};
  data.username=username;


  res.render('login', data);
}

function loginHandler(req, res) {
  var data = {
        title: 'Login',
        username: username,
        error: true
      };
  var username = req.body.username;
  var password = req.body.password;
  data.username ={
    val:username
  };
  console.log(data.username);
  users.auth(username, password, function (err, user) {
    if (user) {
      if (req.session.redirected){
        req.session.user = user;
        res.redirect('/createride');
      }
      else{
        req.session.regenerate(function (){
          req.session.user = user;
          res.redirect('/#s2');
        });
      }
    }
    else {

      res.render('login', data);
    }
  });
}

function logout(req, res) {
  // eyðir session og öllum gögnum, verður til nýtt við næsta request
  req.session.destroy(function(){
    res.redirect('/');
  });
}

function write(req, res) {
  console.log('Keyri write');
  var data={title: 'Skrá ferð'};
  var dags={val: '', valid:true};
  var seats={val: '1', valid:true};
  var time={val: '13:37', valid:true};
  var ride={val:'Farþegum', valid:true};
  var from={val:'Reykjavík', valid:true};
  var to={val:'Akureyri', valid:true};
  var txt={val:'',valid:true};

  data.dags=dags;
  data.seats=seats;
  data.time=time;
  data.ride=ride;
  data.from=from;
  data.to=to;
  data.txt=txt;

  res.render('writeOnWall',data);
}

function change(req, res) {
  console.log('Keyri change');
  res.render('change', { title: 'Breyta færslu'});
}

function redirect(req,res){
  res.render('redirect', {title: 'Úps!'});
}
