var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

var db = new Db('app', new Server('localhost', 27017));
// Establish connection to db
db.open(function(err, db) {

  // Crete the collection for the distinct example
  db.collection('products', function(err, collection) {  

      // Peform a distinct query against the a field
      collection.distinct('productCategory', function(err, docs) {
          console.log(docs);
          process.exit(0);
      });
    })
  });