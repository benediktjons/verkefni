'use strict';

var express = require('express');
var router = express.Router();
var xss = require('xss');

var validate = require('../lib/validate');
var users = require('../lib/users');
var entries = require('../lib/entries');

//router.get('/restricted', ensureLoggedIn, restrictedIndex);
//router.get('/restricted/thewall',ensureLoggedIn, thewall);
router.get('/createride',ensureLoggedIn, write);
router.post('/createride', entryHandler);
router.get('/login', redirectIfLoggedIn, login);
router.post('/login', loginHandler);
router.get('/logout', logout);
router.get('/create', createForm);
router.post('/create', createHandler);  
router.get('/redirect', redirect);

module.exports = router;

//route middlewares

function createForm(req, res) {
  res.render('create', { title: 'Nýskráning' });
}

function createHandler(req, res) {
  var username = xss(req.body.username);
  var password = xss(req.body.password);
  var email = xss(req.body.email);
  var phone = xss(req.body.phone);

  var validUser = validate.length(username, 2);
  var validPw = validate.length(password, 5);
  var validPh = validate.phonenumber(phone);


  if (!validUser){
    res.render('create', {title: 'Nýskráning',
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
  else if(!validPh){
    res.render('create', {title: 'Nýskráning',
    success: false,
    post: true,
    error: 'Villa: Ath Simanumer þarf að vera minstakosti 7 tölustafir.'
  });
  }
  else{
    users.createUser(username, password, email, phone, function (err, status) {
      if (err) {
        console.error(err);
      }

      var success = true;
      var error='';
      if (err || !status) {
        success = false;
        error= 'Villa við að útbúa notanda';
      }

      res.render('create', { title: 'Nýskráning', post: true, error: error, success: success });
    });
  }
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
  console.log('Time fyrir er:'+time)
  time = time.slice(6,10)+'-'+time.slice(3,5)+'-'+time.slice(0,2);
  console.log('Time eftir er:'+time);

  entries.createEntry(username.username,from,to,time,request, smoking, username.userphone, username.useremail, klukka, annad, seats, function(err, status){
    if (err){
      console.error(err);
    }

    var success = true;

    if (err || !status){
      success = false;
    }

    res.redirect('/');
  });
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
          res.redirect('/');
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

function restrictedIndex(req, res) {
  var user = req.session.user;

  users.listUsers(function (err, all) {
    res.render('restricted', { title: 'Leynisvæðið',
      user: user,
      users: all });
  });
}

function thewall(req, res) {
  console.log('Keyri thewall');
  var user = req.session.user;

  entries.listEntries(function (err, all){
    if (err){
      console.error(err);
    }
    res.render('thewall',{title: 'The Wall',
      user: user,
      entries: all});
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

function redirect(req,res){
  res.render('redirect', {title: 'Úps!'});
}
