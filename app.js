var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var multer = require('multer');
var upload = multer();

var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getdataRouter = require('./routes/getdata');
var dataset = require('./routes/dataset');

var app = express();

var db = require('./db');
var url = "mongodb://localhost:27017/";
var dbname = "mydb";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getdata', getdataRouter);
app.use('/data-set', dataset);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var alldata
// Connect to Mongo on start
db.connect(url, dbname, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    console.log('Connected database...')
    var collection = db.get().collection('customers')
    collection.find().project({_id:0}).toArray(function(err, docs){
        alldata = docs
    })
  }
})


//---------- For test as local data ---------------
var coursesData = [
  {
      id: 1,
      title: 'The Complete Node.js Developer Course',
      author: 'Andrew Mead, Rob Percival',
      description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs/'
  },
  {
      id: 2,
      title: 'Node.js, Express & MongoDB Dev to Deployment',
      author: 'Brad Traversy',
      description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
  }
]

// GraphQL schema
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
        products(recordType: String): [Product]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    },
    type data {
        SalesProductId: String
        SalesProductName: String
        SalesCategoryName: String
    },
    type Product {
       _id: ID!
       accountId: String
       recordType: String
       dateRecorded: String
       data: data
    },
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
`);

var getCourse = function(args) { 
  var id = args.id;
  return coursesData.filter(course => {
      return course.id == id;
  })[0];
}

var getCourses = function(args) {
  if (args.topic) {
      var topic = args.topic;
      return coursesData.filter(course => course.topic === topic);
  } else {
      return coursesData;
  }
}

var updateCourseTopic = function({id, topic}) {
  coursesData.map(course => {
      if (course.id === id) {
          course.topic = topic;
          return course;
      }
  });
  return coursesData.filter(course => course.id === id) [0];
}

var getProducts = async(args) => {
  if(args.recordType) {
    var recordType = args.recordType
    var pattern = recordType
    var collection = db.get().collection('customers')
    return (await collection.find({ "recordType": {$regex:pattern } }).toArray())
  }
}

// Root resolver
var root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic,
  products: getProducts,
};

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = app;
