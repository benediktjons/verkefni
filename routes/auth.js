'use strict';
console.log("auth");

var express = require('express');
var router = express.Router();
var xss = require('xss');

var validate = require('../lib/validate');
var users = require('../lib/users');
var entries = require('../lib/entries');

router.get('/about', aboutUs);
router.get('/createride',ensureLoggedIn, write);
router.post('/createride', entryHandler);
//change
router.get('/change', ensureLoggedIn, change);
router.post('/change', changeEntryHandler);
router.get('/login', redirectIfLoggedIn, login);
router.post('/login', loginHandler);
router.get('/logout', logout);
router.get('/create', createForm);
router.post('/create', createHandler);
router.get('/redirect', redirect);

module.exports = router;

//route middlewares
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
  var email={val: '', valid:true};
  var phone={val: '', valid:true};

  data.username= username;
  data.email=email;
  data.phone=phone;
  data.password=password;
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
    val:password,
    valid:(validPw &&validCheckPw)
  };

  if (req.body.phone){
    var phone = xss(req.body.phone);
    var validPh = validate.phonenumber(phone);
    data.phone={
      val:phone,
      valid:validPh
    }
  }
  if (req.body.email){
    var email = xss(req.body.email);
    var validEmail = validate.isEmail(email);
    data.email = {
      val:email,
      valid: validEmail
    };
  }

  var allTrue = (
    data.username.valid &&
    data.email.valid &&
    data.password.valid &&
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
        res.render('login', { title: 'Skráðu þig inn', post: true, error: error,newuser:true, success: success });
      }
    });
  }
  else{
    console.log('Else: Data er:'+data);
    res.render('create',data);
  }
  //Kommentaði bara út! Þetta var gamla fallið en má held ég eyða ef fyrir ofan virkar 100%
  /*
  if (!validUser){
    res.render('create', data{title: 'Nýskráning',
    success: false,
    post: true,
    error: 'Villa: Ath. að notandanafn þarf að vera lengra en 2 stafir.'
  });
  }

  else if(!validPw){
    res.render('create', {title: 'Nýskráning',
    success: false,
    post: true,
    error: 'Villa: lykilorð þarf að vera lengra en 5 stafir.'
  });
  }

  else if(!validCheckPw){
    res.render('create', {title: 'Nýskráning',
    success: false,
    post: true,
    error: 'Villa: lykilorð þurfa að vera eins.'
  });
  }
  else if(!validPh){
    res.render('create', {title: 'Nýskráning',
    success: false,
    post: true,
    error: 'Villa: Símanúmer þarf að vera að minnsta kosti 7 tölustafir.'
  });
  }
  else{
  }*/
}

function entryHandler(req,res){
  console.log('Keyri entryHandler');
  var username = req.session.user;
  var from = xss(req.body.from);
  var to = xss(req.body.to);
  var time = xss(req.body.date);
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
var validDate= validate.checkDate(time);
var validClock= validate.checkClock(klukka);

if(!validFrom){
  //villumedhondlun
  res.render('writeOnWall', {title: 'Skrá ferð',
    success: false,
    post: true,
    error: 'Villa: Ath. að velja þarf möguleika úr Frá boxinu.'
  });
}

else if(!validTo){
  //villumedhondlun
  res.render('writeOnWall', {title: 'Jæja, þarna gerðist eitthvað',
    success: false,
    post: true,
    error: 'Villa: Ath. að velja þarf möguleika úr Til boxinu.'
    });
}
else if(!validRequest){
  //villumedhondlun
  res.render('writeOnWall', {title: 'Skutla?',
    success: false,
    post: true,
    error: 'Villa: Ath. að velja þarf möguleika úr óska eftir boxinu..'
    });
}
else if(!validnumberOfSeats){
  //villumedhondlun
  res.render('writeOnWall', {title: 'Hversu margir?',
    success: false,
    post: true,
    error: 'Villa: Ath. að  velja þarf fjölda sæta úr fjöldi sæta boxinu.'
    });
}
else if(!validClock){
  //villumedhondlun
  res.render('writeOnWall', {title: 'Klukkan?',
    success: false,
    post: true,
    error: 'Villa: Ath. að velja þarf  Klukku..'
    });
}
else if(!validDate){
  //villumedhondlun
  res.render('writeOnWall', {title: 'Hvenær?',
    success: false,
    post: true,
    error: 'Villa: Ath. ertu viss um að þessi dagsetning sé ekki liðin?...'
    });
}


else{
  time = time.slice(6,10)+'-'+time.slice(3,5)+'-'+time.slice(0,2);

  entries.createEntry(username.username,
    from,
    to,
    time,
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

function changeEntryHandler(req,res){
  console.log('Keyri changeEntryHandler');
  var id = xss(req.body.myid);
  console.log('id3');
  console.log(id);
  var username = req.session.user;
  var from = xss(req.body.from);
  var to = xss(req.body.to);
  var time = xss(req.body.date);
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
var validDate= validate.checkDate(time);
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
  time = time.slice(6,10)+'-'+time.slice(3,5)+'-'+time.slice(0,2);

  entries.changeEntry(id,
    username.username,
    from,
    to,
    time,
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
  res.render('login', { title: 'Login'});
}

function loginHandler(req, res) {
  var username = req.body.username;
  var password = req.body.password;

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
      var data = {
        title: 'Login',
        username: username,
        error: true
      };
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
  var user = req.session.user;
  entries.listEntries(function (err, all) {
    res.render('writeOnWall', { title: 'Skrifa á vegg',
      user: user,
      users: all });
  });
}

function change(req, res) {
  console.log('Keyri change');
  var user = req.session.user;
  entries.listEntries(function (err, all) {
    res.render('change', { title: 'Breyta færslu',
      user: user,
      users: all });
  });
}

function redirect(req,res){
  res.render('redirect', {title: 'Úps!'});
}
