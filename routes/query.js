var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET method  */
router.get('/', function(req, res, next) {
    
    var accountId = req.query.accountId
    var recordType = req.query.recordType
    if(accountId == undefined || recordType == undefined){
        res.json({"result": "accountId and recordType are requried!"})
        return
    }
    for(var key in req.query){
        if(key.indexOf('.') >= 0){
            var a = key.split('.');
            if(!(a[1] == "SalesProductId" || a[1] == "SalesProductName" || a[1] == "SalesCategoryName")){
                res.json({"result":"There is no record '" + a[1] + "' in data. You can choose 'data.SalesProductId' or 'data.SalesProductName' or 'data.SalesCategoryName'"})
                return
            }
        }
    }
    var dataSalesProductId = req.query["data.SalesProductId"]
    var dataSalesProductName = req.query["data.SalesProductName"]
    var dataSalesCategoryName = req.query["data.SalesCategoryName"]
    var sortBy = req.query.sortBy
    var sortDir = req.query.sortDir
    var fieldname = req.query.fieldname
    var collection = db.get().collection('customers')
    var condition
    condition = { accountId: accountId, recordType: recordType }
    if(dataSalesProductId != undefined){
        var pattern = dataSalesProductId
        pattern = pattern.split('$').join('');
        count$ = dataSalesProductId.split('$').length - 1;
        if(count$ == 0){
            condition["data.SalesProductId"] = pattern
        } 
        if(count$ == 1 && dataSalesProductId.indexOf('$') == 0){
            pattern = pattern + '$'
            condition["data.SalesProductId"] = new RegExp(pattern, 'i')
        }
        if(count$ == 1 && dataSalesProductId.indexOf('$') > 0){
            pattern = '^' + pattern
            condition["data.SalesProductId"] = new RegExp(pattern, 'i')
        }
        console.log(count$)
        if(count$ == 2){
            condition["data.SalesProductId"] = new RegExp(pattern, 'i')
        }
    }
    if(dataSalesProductName != undefined){
        var pattern = dataSalesProductName
        pattern = pattern.split('$').join('');
        count$ = dataSalesProductName.split('$').length - 1;
        if(count$ == 0){
            condition["data.SalesProductName"] = pattern
        } 
        if(count$ == 1 && dataSalesProductName.indexOf('$') == 0){
            pattern = pattern + '$'
            condition["data.SalesProductName"] = new RegExp(pattern, 'i')
        }
        if(count$ == 1 && dataSalesProductName.indexOf('$') > 0){
            pattern = '^' + pattern
            condition["data.SalesProductName"] = new RegExp(pattern, 'i')
        }
        console.log(count$)
        if(count$ == 2){
            condition["data.SalesProductName"] = new RegExp(pattern, 'i')
        }
    }
    if(dataSalesCategoryName != undefined){
        var pattern = dataSalesCategoryName
        pattern = pattern.split('$').join('');
        count$ = dataSalesCategoryName.split('$').length - 1;
        if(count$ == 0){
            condition["data.SalesCategoryName"] = pattern
        } 
        if(count$ == 1 && dataSalesCategoryName.indexOf('$') == 0){
            pattern = pattern + '$'
            condition["data.SalesCategoryName"] = new RegExp(pattern, 'i')
        }
        if(count$ == 1 && dataSalesCategoryName.indexOf('$') > 0){
            pattern = '^' + pattern
            condition["data.SalesCategoryName"] = new RegExp(pattern, 'i')
        }
        if(count$ == 2){
            condition["data.SalesCategoryName"] = new RegExp(pattern, 'i')
        }
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
    
    if(sortBy != undefined && (sortBy.indexOf('data.SalesProductId') !=-1 || sortBy.indexOf('data.SalesProductName') !=-1 || sortBy.indexOf('data.SalesCategoryName') !=-1 || sortBy.indexOf('accountId') != -1 || sortBy.indexOf('recordType') != -1)){
        var sort = {}
        if(sortBy.indexOf('data.SalesProductId') != -1){
            if(sortDir != undefined && sortDir == 'DESC'){
                sort = {'data.SalesProductId':-1}
            } else{
                sort = {'data.SalesProductId':1}
            }
        }
        if(sortBy.indexOf('data.SalesProductName') != -1){
            if(sortDir != undefined && sortDir == 'DESC'){
                sort = {'data.SalesProductName':-1}
            } else{
                sort = {'data.SalesProductName':1}
            }
        }
        if(sortBy.indexOf('data.SalesCategoryName') != -1){
            if(sortDir != undefined && sortDir == 'DESC'){
                sort = {'data.SalesCategoryName':-1}
            } else{
                sort = {'data.SalesCategoryName':1}
            }
        }
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
});

/* POST method  */
router.post('/', function(req, res, next) {
    var accountId = req.body.accountId
    var recordType = req.body.recordType
    if(accountId == undefined || recordType == undefined){
        res.json({"result": "accountId and recordType are requried!"})
        return
    }
    for(var key in req.body){
        if(key.indexOf('.') >= 0){
            var a = key.split('.');
            if(!(a[1] == "SalesProductId" || a[1] == "SalesProductName" || a[1] == "SalesCategoryName")){
                res.json({"result":"There is no record '" + a[1] + "' in data. You can choose 'data.SalesProductId' or 'data.SalesProductName' or 'data.SalesCategoryName'"})
                return
            }
        }
    }
    var dataSalesProductId = req.body["data.SalesProductId"]
    var dataSalesProductName = req.body["data.SalesProductName"]
    var dataSalesCategoryName = req.body["data.SalesCategoryName"]
    var sortBy = req.body.sortBy
    var sortDir = req.body.sortDir
    var fieldname = req.body.fieldname
    var collection = db.get().collection('customers')
    var condition
    condition = { accountId: accountId, recordType: recordType }
    if(dataSalesProductId != undefined){
        var pattern = dataSalesProductId
        pattern = pattern.split('$').join('');
        count$ = dataSalesProductId.split('$').length - 1;
        if(count$ == 0){
            condition["data.SalesProductId"] = pattern
        } 
        if(count$ == 1 && dataSalesProductId.indexOf('$') == 0){
            pattern = pattern + '$'
            condition["data.SalesProductId"] = new RegExp(pattern, 'i')
        }
        if(count$ == 1 && dataSalesProductId.indexOf('$') > 0){
            pattern = '^' + pattern
            condition["data.SalesProductId"] = new RegExp(pattern, 'i')
        }
        console.log(count$)
        if(count$ == 2){
            condition["data.SalesProductId"] = new RegExp(pattern, 'i')
        }
    }
    if(dataSalesProductName != undefined){
        var pattern = dataSalesProductName
        pattern = pattern.split('$').join('');
        count$ = dataSalesProductName.split('$').length - 1;
        if(count$ == 0){
            condition["data.SalesProductName"] = pattern
        } 
        if(count$ == 1 && dataSalesProductName.indexOf('$') == 0){
            pattern = pattern + '$'
            condition["data.SalesProductName"] = new RegExp(pattern, 'i')
        }
        if(count$ == 1 && dataSalesProductName.indexOf('$') > 0){
            pattern = '^' + pattern
            condition["data.SalesProductName"] = new RegExp(pattern, 'i')
        }
        console.log(count$)
        if(count$ == 2){
            condition["data.SalesProductName"] = new RegExp(pattern, 'i')
        }
    }
    if(dataSalesCategoryName != undefined){
        var pattern = dataSalesCategoryName
        pattern = pattern.split('$').join('');
        count$ = dataSalesCategoryName.split('$').length - 1;
        if(count$ == 0){
            condition["data.SalesCategoryName"] = pattern
        } 
        if(count$ == 1 && dataSalesCategoryName.indexOf('$') == 0){
            pattern = pattern + '$'
            condition["data.SalesCategoryName"] = new RegExp(pattern, 'i')
        }
        if(count$ == 1 && dataSalesCategoryName.indexOf('$') > 0){
            pattern = '^' + pattern
            condition["data.SalesCategoryName"] = new RegExp(pattern, 'i')
        }
        if(count$ == 2){
            condition["data.SalesCategoryName"] = new RegExp(pattern, 'i')
        }
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
    
    if(sortBy != undefined && (sortBy.indexOf('data.SalesProductId') !=-1 || sortBy.indexOf('data.SalesProductName') !=-1 || sortBy.indexOf('data.SalesCategoryName') !=-1 || sortBy.indexOf('accountId') != -1 || sortBy.indexOf('recordType') != -1)){
        var sort = {}
        if(sortBy.indexOf('data.SalesProductId') != -1){
            if(sortDir != undefined && sortDir == 'DESC'){
                sort = {'data.SalesProductId':-1}
            } else{
                sort = {'data.SalesProductId':1}
            }
        }
        if(sortBy.indexOf('data.SalesProductName') != -1){
            if(sortDir != undefined && sortDir == 'DESC'){
                sort = {'data.SalesProductName':-1}
            } else{
                sort = {'data.SalesProductName':1}
            }
        }
        if(sortBy.indexOf('data.SalesCategoryName') != -1){
            if(sortDir != undefined && sortDir == 'DESC'){
                sort = {'data.SalesCategoryName':-1}
            } else{
                sort = {'data.SalesCategoryName':1}
            }
        }
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
});

module.exports = router;