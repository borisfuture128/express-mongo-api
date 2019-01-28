var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET method  */
router.get('/', function(req, res, next) {
    var accountId = req.query.accountId
    var recordType = req.query.recordType
    var dataProductName = req.query.dataProductName
    var sortBy = req.query.sortBy
    var sortDir = req.query.sortDir
    var fieldname = req.query.fieldname
    var collection = db.get().collection('customers')
    if(accountId != undefined || recordType != undefined){
        var condition
        if(accountId == undefined){
            condition = {recordType: recordType}
        } 
        if(recordType == undefined){
            condition = {accountId: accountId}
        }
        if(accountId != undefined && recordType != undefined){
            condition = { accountId: accountId, recordType: recordType}
        }

        if(dataProductName != undefined || dataProductName != ""){
            condition["data.SalesProductName"] = new RegExp(dataProductName, 'i')
        }
        console.log(condition)
        var field = {_id:0}
        if(fieldname != undefined){
            if(fieldname.indexOf('accountId') != -1 || fieldname.indexOf('recordType') != -1 || fieldname.indexOf('dateRecorded') != -1 || fieldname.indexOf('data') != -1){
                if(fieldname.indexOf('accountId') == -1){
                    field.accountId = 0;
                }
                if(fieldname.indexOf('recordType') == -1){
                    field.recordType = 0;
                }
                if(fieldname.indexOf('dateRecorded') == -1){
                    field.dateRecorded = 0;
                }
                if(fieldname.indexOf('data') == -1){
                    field.data = 0;
                }
            }
        }
        
        if(sortBy != undefined && (sortBy.indexOf('accountId') != -1 || sortBy.indexOf('recordType') != -1)){
            var sort = {}
            if(sortBy.indexOf('accountId') != -1){
                if(sortDir != undefined && sortDir == 'DESC'){
                    sort = {accountId:-1}
                } else{
                    sort = {accountId:1}
                }
            } 
            if(sortBy.indexOf('recordType') != -1){
                if(sortDir != undefined && sortDir == 'DESC'){
                    sort = {recordType:-1}
                } else{
                    sort = {recordType:1}
                }
            } 
            collection.find(condition).project(field).sort(sort).toArray(function(err, docs){
                res.json({"result": docs})
            })
        } else{
            collection.find(condition).project(field).toArray(function(err, docs){
                res.json({"result": docs})
            })
        }
    } else{
        res.json({"result": "accountId or recordType is requried"})
    }
});

/* POST method  */
router.post('/', function(req, res, next) {
    var accountId = req.body.accountId
    var recordType = req.body.recordType
    var dataProductName = req.body.dataProductName
    var sortBy = req.body.sortBy
    var sortDir = req.body.sortDir
    var fieldname = req.body.fieldname
    var collection = db.get().collection('customers')
    if(accountId != undefined || recordType != undefined){
        var condition
        if(accountId == undefined){
            condition = {recordType: recordType}
        } 
        if(recordType == undefined){
            condition = {accountId: accountId}
        }
        if(accountId != undefined && recordType != undefined){
            condition = { accountId: accountId, recordType: recordType}
        }
        
        if(dataProductName != undefined || dataProductName != ""){
            condition["data.SalesProductName"] = new RegExp(dataProductName, 'i')
        }
        console.log(condition)
        var field = {_id:0}
        if(fieldname != undefined){
            if(fieldname.indexOf('accountId') != -1 || fieldname.indexOf('recordType') != -1 || fieldname.indexOf('dateRecorded') != -1 || fieldname.indexOf('data') != -1){
                if(fieldname.indexOf('accountId') == -1){
                    field.accountId = 0;
                }
                if(fieldname.indexOf('recordType') == -1){
                    field.recordType = 0;
                }
                if(fieldname.indexOf('dateRecorded') == -1){
                    field.dateRecorded = 0;
                }
                if(fieldname.indexOf('data') == -1){
                    field.data = 0;
                }
            }
        }
        
        if(sortBy != undefined && (sortBy.indexOf('accountId') != -1 || sortBy.indexOf('recordType') != -1)){
            var sort = {}
            if(sortBy.indexOf('accountId') != -1){
                if(sortDir != undefined && sortDir == 'DESC'){
                    sort = {accountId:-1}
                } else{
                    sort = {accountId:1}
                }
            } 
            if(sortBy.indexOf('recordType') != -1){
                if(sortDir != undefined && sortDir == 'DESC'){
                    sort = {recordType:-1}
                } else{
                    sort = {recordType:1}
                }
            } 
            collection.find(condition).project(field).sort(sort).toArray(function(err, docs){
                res.json({"result": docs})
            })
        } else{
            collection.find(condition).project(field).toArray(function(err, docs){
                res.json({"result": docs})
            })
        }
    } else{
        res.json({"result": "accountId or recordType is requried"})
    }
});

module.exports = router;