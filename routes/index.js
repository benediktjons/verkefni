'use strict';

var express = require('express');
var router = express.Router();
var entries = require('../lib/entries');

router.get('/', function(req, res) {
    entries.listEntries(function (err, all){
    if (err){
      console.error(err);
    }
    console.log("her er entries")
    console.log(entries)
    res.render('index',{title: 'Velkominn',
      entries: all});
  });
});

module.exports = router;
