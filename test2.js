// A simple example showing the use of the cursor stream function.

var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {

  // Create a lot of documents to insert
  var docs = []
  for(var i = 0; i < 1000; i++) {
    docs.push({'a':i})
  }

  // Create a collection
  var collection = db.collection('test_stream_function');

  // Insert documents into collection
  collection.insertMany(docs, {w:1}, function(err, ids) {
    // Peform a find to get a cursor
    var stream = collection.find().stream();

    // Execute find on all the documents
    stream.on('end', function() {
      db.close();
    });

    stream.on('data', function(data) {
      test.ok(data != null);
      console.log(data);
    });
  });
});