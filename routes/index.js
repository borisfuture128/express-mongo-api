var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("index.js /")
  //var collection = db.get().collection('customers')
  var collection = db.get().collection('customers')
  collection.find().toArray(function(err, docs) {
    //res.render('comments', {comments: docs})
    console.log(docs)
  })

  res.render('index', { title: 'Express' });
});

module.exports = router;
