var MongoClient = require('mongodb').MongoClient

var state = {
  db: null,
  data_params: []
}

exports.connect = function(url, dbname, done) {
  if (state.db) return done()
  MongoClient.connect(url, function(err, db) {
    if (err) return done(err)
    state.db = db.db(dbname)
    //----- get data param -------
    var collection = db.db('mydb').collection('customers')
    collection.find().project({_id:0}).toArray(function(err, docs){
        docs.forEach(element => {
          for(var key in element.data){
            if(!state.data_params.includes(key)){
              state.data_params.push(key)
            }
          }
        });
    })
    //----- end of get data param ---
    done()
  })
}

exports.get = function() {
  return state.db
}

exports.getDataParam = function(){
  return state.data_params
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}