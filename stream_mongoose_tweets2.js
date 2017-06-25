const Tweet = require('./models/tweet');

var query = {};
var options = {tailable: true, awaitdata: true, numberOfRetries: Number.MAX_VALUE};

var stream = Tweet.find(query, options).stream();

stream.on('data', function(doc){
    console.log(doc);
}).on('error', function (error){
    console.log(error);
}).on('close', function () {
    console.log('closed');
});


const express = require('express');
const app = express();
var http = require('http').Server(app);

let port = 3000;

http.listen(port, function () {
    console.log('Server listening at port %d', port);
});