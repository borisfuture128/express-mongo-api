var config = {}
config.url = "mongodb://localhost:27017/";
config.database = "mydb"
config.collection = "customers"
config.users = [{
    "username":"alberto",
    "password":"123456"
},{
    "username":"myuser1",
    "password":"123456"
},{
    "username":"myuser2",
    "password":"123456"
}]
module.exports = config