var express = require('express');
var router = express.Router();
var db = require('../db');

/* get all data  */
router.get('/', function(req, res, next) {
    var collection = db.get().collection('customers')
    collection.find().project({_id:0}).toArray(function(err, docs){
        console.log(docs)
        res.json({"result":docs})
    })
});

/* get filtered data  */
router.get('/:SalesCategoryName', function(req, res, next) {
    var SalesCategoryName = req.params.SalesCategoryName;
    if(SalesCategoryName != undefined){
      var collection = db.get().collection('customers')
      var pattern = SalesCategoryName
      collection.find( { "data.SalesCategoryName": new RegExp(pattern, 'i') }).project({_id:0}).toArray(function(err, docs){
          res.json({"result":docs})
      })
      return;
    } else{
      res.json({message: "Not Found"});
      return;
    }
});

module.exports = router;