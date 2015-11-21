'use strict';

var express = require('express');
var router = express.Router();
var entries = require('../lib/entries')

router.get('/', function(req, res) {
    entries.listEntries(function (err, all){
    if (err){
      console.error(err);
    }
    res.render('index',{title: 'Velkominn',
      entries: all});
  });
});

module.exports = router;
