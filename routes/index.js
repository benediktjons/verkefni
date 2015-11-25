'use strict';
console.log("index.js");
var express = require('express');
var router = express.Router();
var entries = require('../lib/entries');


router.get('/', function(req, res) {
  var id=req.query.id;
  if(id){
    console.log("inni i falli");
    console.log(id);
    entries.deleteEntry(id, function(err, status){
      if (err){
        console.error(err);
      }

      var success = true;

      if (err || !status){
        success = false;
      }
    });
    res.redirect('back');
}
    entries.listEntries(function (err, all){
    if (err){
      console.error(err);
    }

    if (req.session.user){
        var user=req.session.user;
        console.log("her kemur entries1");
        console.log(entries);
        res.render('index',{title:'Velkominn', user:user, entries:all});
    }
    else{
    res.render('index',{title: 'Velkominn',
      entries: all});
    }
  });
});


module.exports = router;
