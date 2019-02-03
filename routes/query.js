var express = require('express');
var router = express.Router();
var db = require('../db');
var config = require('../config');

/* GET method  */
router.get('/', function(req, res, next) {
    var collection = db.get().collection(config.collection)
    var accountId = req.query.accountId
    var recordType = req.query.recordType
    if(accountId == undefined || recordType == undefined){
        res.json({"result": "accountId and recordType are requried!"})
        return
    }

    var data_params = db.getDataParam();
    for(var key in req.query){
        if(key.indexOf('.') >= 0){
            var a = key.split('.');
            if(!data_params.includes(a[1])){
                var str = data_params[0]
                for(var i = 1; i<data_params.length; i++){
                    str += "," + data_params[i]
                }
                res.json({"result":"No params of " + a[1] + " in data. You can consider " + str})
                return
            }
        }
    }
    var sortBy = req.query.sortBy
    var sortDir = req.query.sortDir
    var condition
    accountId = parseInt(accountId)
    condition = { accountId: accountId, recordType: recordType }
    for(var key in req.query){
        if(key.indexOf('.') >= 0){
            var value = req.query[key]
            var pattern = value
            pattern = pattern.split('$').join('');
            count$ = value.split('$').length - 1;
            if(count$ == 0){
                if(parseFloat(pattern) != NaN){
                    pattern = parseFloat(pattern)
                }
                condition[key] = pattern
            } 
            if(count$ == 1 && value.indexOf('$') == 0){
                pattern = pattern + '$'
                condition[key] = new RegExp(pattern, 'i')
            }
            if(count$ == 1 && value.indexOf('$') > 0){
                pattern = '^' + pattern
                condition[key] = new RegExp(pattern, 'i')
            }
            if(count$ == 2){
                condition[key] = new RegExp(pattern, 'i')
            }
        }
    }
    var field = {_id:0,accountId:0,recordType:0}
    var sort = {}
    if(sortBy != undefined){
        var a = sortBy.split('.')
        if(data_params.includes(a[1])){
            if(sortDir != undefined){
                if(sortDir == 'DESC' || sortDir == 'ASC'){
                    if(sortDir == 'DESC'){
                        sort = {[sortBy]:-1}
                    } else{
                        sort = {[sortBy]:1}
                    }
                } else{
                    res.json({"result":"No parameter: " + sortDir + " in sortDir. Please choose 'DESC' or 'ASC' for sortDir."})
                    return
                }
            } else{
                sort = {[sortBy]:1}
            }
            collection.find(condition).project(field).sort(sort).toArray(function(err, docs){
                res.json({"result": getResult(accountId, recordType, docs)})
                return
            })
        } else{
            res.json({"result":"No parameter: " + sortBy + " in sortBy."})
            return
        }
    } else{
        collection.find(condition).project(field).toArray(function(err, docs){
            res.json({"result": getResult(accountId, recordType, docs)})
        })
    }
});

/* POST method  */
router.post('/', function(req, res, next) {
    if(req.body.length == undefined){
        var collection = db.get().collection(config.collection)
        var accountId = req.body.accountId
        var recordType = req.body.recordType
        if(accountId == undefined || recordType == undefined){
            res.json({"result": "accountId and recordType are requried!"})
            return
        }
        var data_params = db.getDataParam();
        for(var key in req.body){
            if(key.indexOf('.') >= 0){
                var a = key.split('.');
                if(!data_params.includes(a[1])){
                    var str = data_params[0]
                    for(var i = 1; i<data_params.length; i++){
                        str += "," + data_params[i]
                    }
                    res.json({"result":"No params of " + a[1] + " in data. You can consider " + str})
                    return
                }
            }
        }
        var sortBy = req.body.sortBy
        var sortDir = req.body.sortDir
        var condition
        accountId = parseInt(accountId)
        condition = { accountId: accountId, recordType: recordType }
        for(var key in req.body){
            if(key.indexOf('.') >= 0){
                var value = req.body[key]
                var pattern = value
                pattern = pattern.split('$').join('');
                count$ = value.split('$').length - 1;
                if(count$ == 0){
                    if(parseFloat(pattern) != NaN){
                        pattern = parseFloat(pattern)
                    }
                    condition[key] = pattern
                } 
                if(count$ == 1 && value.indexOf('$') == 0){
                    pattern = pattern + '$'
                    condition[key] = new RegExp(pattern, 'i')
                }
                if(count$ == 1 && value.indexOf('$') > 0){
                    pattern = '^' + pattern
                    condition[key] = new RegExp(pattern, 'i')
                }
                if(count$ == 2){
                    condition[key] = new RegExp(pattern, 'i')
                }
            }
        }
        var field = {_id:0,accountId:0,recordType:0}
        var sort = {}
        if(sortBy != undefined){
            var a = sortBy.split('.')
            if(data_params.includes(a[1])){
                if(sortDir != undefined){
                    if(sortDir == 'DESC' || sortDir == 'ASC'){
                        if(sortDir == 'DESC'){
                            sort = {[sortBy]:-1}
                        } else{
                            sort = {[sortBy]:1}
                        }
                    } else{
                        res.json({"result":"No parameter: " + sortDir + " in sortDir. Please choose 'DESC' or 'ASC' for sortDir."})
                        return
                    }
                } else{
                    sort = {[sortBy]:1}
                }
                collection.find(condition).project(field).sort(sort).toArray(function(err, docs){
                    res.json({"result": getResult(accountId, recordType, docs)})
                    return
                })
            } else{
                res.json({"result":"No parameter: " + sortBy + " in sortBy."})
                return
            }
        } else{
            collection.find(condition).project(field).toArray(function(err, docs){
                res.json({"result": getResult(accountId, recordType, docs)})
            })
        }
    } else{
        var data = req.body
        var accountId = data[0].accountId
        var recordType = data[0].recordType
        if(accountId == undefined || recordType == undefined){
            res.json({"result": "accountId and recordType are requried!"})
            return
        }
        var collection = db.get().collection(config.collection)
        var query = {accountId: accountId, recordType: recordType}
        collection.remove(query, function(error, inserted) {
            if(error){
                res.json({"result":error})
            } else{
                var result = insertDocs(data)
                res.json({"result": result})
            }
        })
    }
});

function insertDocs(data){
    var collection = db.get().collection(config.collection)
    collection.insertMany(data, function(error, inserted) {
        if(error) {
            console.error(error)
            return error
        }
        else {
            console.log("Successfully inserted: " , inserted )
            return "Successfully inserted: " + inserted
        }
    });
    return "Successfully inserted: n = " + data.length
}

function getResult(accountId, recordType, docs){
    var result = {
        accountId: accountId,
        recordType: recordType,
        recordDate:"",
        data:[]
    }
    if(docs.length > 0){
        result.recordDate = docs[0].recordDate;
        for(var i=0; i < docs.length ;i++){
            result.data.push(docs[i].data)
        }
    }
    return result;
}

module.exports = router;