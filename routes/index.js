var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  var collection = db.get().collection('customers')

  collection.find().toArray(function(err, docs) {
    res.render('comments', {comments: docs})
  })

  //res.render('index', { title: 'Express' });
});

module.exports = router;
