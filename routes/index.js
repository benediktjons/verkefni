'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Velkominn' });
});

module.exports = router;
