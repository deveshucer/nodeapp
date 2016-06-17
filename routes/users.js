var express = require('express');
var router = express.Router();

/* GET users listing. */


// Retrieve
// var MongoClient = require('mongodb').MongoClient;

// // Connect to the db
// MongoClient.connect("mongodb://localhost:27017/nodeapp", function(err, db) {
//   if(!err) {
//     console.log("We are connected");
//   }else{
//     console.log("unable to connect" + err);
//   }
// });

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/nodeapp';

var users = [];

var findUsers = function(db, callback) {
   var cursor =db.collection('users').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        //  console.dir(doc);
         users.push(doc);
      } else {
         callback();
      }
   });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findUsers(db, function() {
      db.close();
  });
});


router.get('/', function(req, res, next) {
  res.send(JSON.stringify(users));
});

module.exports = router;
