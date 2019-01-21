var express = require('express');
var router = express.Router();
var db = require('../db');

/* get all data  */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  if(id == "all"){
    var collection = db.get().collection('customers')
    collection.find().toArray(function(err, docs) {
      res.json({"result":docs})
    })
    return;
  } else{
    res.json({message: "Not Found"});
    return;
  }
});

/* GET method */
router.get('/', function(req, res, next) {
  var RecordType = req.query.RecordType
  var DataName = req.query.DataName
  console.log("RecordType:" + RecordType)
  console.log("DataName:" + DataName)
  var collection = db.get().collection('customers')
  if(RecordType != undefined && DataName != undefined){
    // SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%" AND Data.Name LIKE "%{pattern}%"  
    console.log('SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%" AND Data.Name LIKE "%{pattern}%"')
    var pattern1 = RecordType
    var pattern2 = DataName
    collection.find({"recordType": {$regex:pattern1 }, "Data.Name": {$regex:pattern2}}, {_id:0}).toArray(function(err, docs) {
      console.log(docs)
      res.json({"result":docs})
    })
    return;
  }

  if(RecordType != undefined && DataName == undefined){
    // SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%"
    console.log('SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%"')
    var pattern = RecordType
    collection.find( { "recordType": {$regex:pattern } }).project({_id:0}).toArray(function(err, docs){
      console.log(docs)
      res.json({"result":docs})
    })
    return;
  }

  if(RecordType == undefined && DataName != undefined){
    // SELECT * FROM collection WHERE Data.Name LIKE "%{pattern}%"  
    console.log('SELECT * FROM collection WHERE Data.Name LIKE "%{pattern}%"')
    var pattern = DataName
    collection.find({ "Data.Name": {$regex:pattern }}, {_id:0}).toArray(function(err, docs) {
      console.log(docs)
      res.json({"result":docs})
    })
    return;
  }
  res.json({"message": "Bad Request"});
  //res.render('index', { title: 'Express' });
});

/* POST method */
router.post('/', function(req, res, next) {
    var RecordType = req.body.RecordType
    var DataName = req.body.DataName
    console.log("RecordType:" + RecordType)
    console.log("DataName:" + DataName)
    var collection = db.get().collection('customers')
    if(RecordType != undefined && DataName != undefined){
      // SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%" AND Data.Name LIKE "%{pattern}%"  
      console.log('SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%" AND Data.Name LIKE "%{pattern}%"')
      var pattern1 = RecordType
      var pattern2 = DataName
      collection.find({"recordType": {$regex:pattern1 }, "Data.Name": {$regex:pattern2}}, {_id:0}).toArray(function(err, docs) {
        console.log(docs)
        res.json({"result":docs})
      })
      return;
    }
  
    if(RecordType != undefined && DataName == undefined){
      // SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%"
      console.log('SELECT * FROM collection WHERE RecordType LIKE "%{pattern}%"')
      var pattern = RecordType
      collection.find( { "recordType": {$regex:pattern } }).project({_id:0}).toArray(function(err, docs){
        console.log(docs)
        res.json({"result":docs})
      })
      return;
    }
  
    if(RecordType == undefined && DataName != undefined){
      // SELECT * FROM collection WHERE Data.Name LIKE "%{pattern}%"  
      console.log('SELECT * FROM collection WHERE Data.Name LIKE "%{pattern}%"')
      var pattern = DataName
      collection.find({ "Data.Name": {$regex:pattern }}, {_id:0}).toArray(function(err, docs) {
        console.log(docs)
        res.json({"result":docs})
      })
      return;
    }
    res.json({"message": "Bad Request"});
    //res.render('index', { title: 'Express' });
  });

module.exports = router;
