var express = require('express');
var router = express.Router();
var db = require('../db');

/* get all data  */
router.get('/:recordtype', function(req, res, next) {
    var recordtype = req.params.recordtype;
    if(recordtype != undefined){
      var collection = db.get().collection('customers')
      var pattern = recordtype
        collection.find( { "recordType": {$regex:pattern } }).project({_id:0}).toArray(function(err, docs){
            console.log(docs)
            res.json({"result":docs})
        })
      return;
    } else{
      res.json({message: "Not Found"});
      return;
    }
});

module.exports = router;