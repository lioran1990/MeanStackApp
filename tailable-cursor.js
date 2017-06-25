/**
 * How to subscribe for new MongoDB documents in Node.js using tailable cursor
 */

// subscriber function
var subscribe = function(){

  var args = [].slice.call(arguments);
  var next = args.pop();
  var filter = args.shift() || {};
  
  if('function' !== typeof next) throw('Callback function not defined');
  
  // connect to MongoDB
  require('mongodb').MongoClient.connect('mongodb://localhost:27017/app', function(err, db){
    
    // make sure you have created capped collection "messages" on db "test"
    db.collection('tweets', function(err, coll) {

      // seek to latest object
      var seekCursor = coll.find(filter);//.sort({$natural: -1}).limit(1);
      seekCursor.nextObject(function(err, latest) {
        if (latest) {
          filter._id = { $gt: latest._id }
        }
        
        // set MongoDB cursor options
        var cursorOptions = {
          tailable: true,
          awaitdata: true,
          numberOfRetries: -1
        };
        
        // create stream and listen
        // var stream = coll.find(filter, cursorOptions).sort({$natural: -1}).stream();
        var stream = coll.find(filter, cursorOptions).stream();
        
        // call the callback
        stream.on('data', next);
      });
    });

  });
  
};

// new documents will appear in the console
subscribe( function(document) {
  console.log(document);  
});