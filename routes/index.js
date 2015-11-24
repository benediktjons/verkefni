'use strict';

var express = require('express');
var router = express.Router();

var entries = require('../lib/entries');



router.get('/',   function(req, res) {
    entries.listEntries(function (err, all){
    if (err){
      console.error(err);
    }

    if (req.session.user){
        var user=req.session.user;
        res.render('index',{title:'Velkominn', user:user, entries:all});
    }
    else{

    res.render('index',{title: 'Velkominn',
      entries: all});
    }
  });
});

module.exports = router;
