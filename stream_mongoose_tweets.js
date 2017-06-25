const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Tweet = require('./models/tweet');

// Globals
// let Tweet = mongoose.model('Juice', juiceSchema);

// run program
exec()
  .catch(error => {
    console.error(`Error: ${error}\n${error.stack}`);
    process.exit(2);
  });


function exec() {
  return startTailableCursor()
  .then(() => {
      setInterval(log, 3000);
    })
}

function log() {
    console.log("waitng...");
}

// starts the cursor and sets listeners
function startTailableCursor() {
  return new Promise(function(resolve, reject) {
    const cursor = Tweet
      .find()
      .tailable()
      .stream();

    cursor.on('data', (doc) => {
      console.log('doc', doc);
    });
    cursor.on('close', function() {
      console.log('closing...');
      resolve();
    });

    cursor.on('error', error => {
      console.error(error);
      cursor.destroy();
      reject(error);
    });
  });
}

const express = require('express');
const app = express();
var http = require('http').Server(app);

let port = 3000;

http.listen(port, function () {
    console.log('Server listening at port %d', port);
});