/**
 * Created by Lioran on 6/11/2017.
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const cors = require('cors');
const passport= require('passport');
const mongoose= require('mongoose');
const config= require('./config/database');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// const Tweet = require('./models/tweet');

// require('events').EventEmitter.defaultMaxListeners = Infinity;
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     next();
// }

// app.use(allowCrossDomain);


//Connect to DB using config file
mongoose.connect(config.database);

//On connection event
mongoose.connection.on('connected',()=>{
    console.log('Connected to database '+ config.database);
});

//On error (connection to DB)
mongoose.connection.on('error',(err)=>{
    console.log('Database error '+ err);
});

const users= require('./routes/users');
const products = require('./routes/products');
const shops = require('./routes/shops');

//Port Number
const port = 8080;

//CORS Middleware
// app.use(cors());

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'angular-src/src')));

//Body Parser Middleware
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);
app.use('/products', products);
app.use('/shops', shops);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

//landing default page
// app.get('*', (req,res)=> {
//     res.sendFile(path.join(__dirname,'public/index.html'));
// });

// console.log("init twitter stream from db");

// stream = Tweet.getStream({ beginData : new Date().toLocaleDateString() });

// stream.on('data', function (doc) {
//   // do something with the mongoose document
//   console.log(data);
// }).on('error', function (err) {
//   console.log(err);
// }).on('close', function () {
//   console.log("close stream");
// });
// Tweet.getAllTweetsByTime({ beginData : new Date().toLocaleDateString() }, function(err,callback){
//     if(err){
//         console.log(callback)
//         // res.json({success: false, msg:'Failed fetching all products'});
//     }else{
//         console.log("inSuccess");
//         console.log({callback,success:true, msg:'Listing products '});
//     }
// });

// socketio 
io.on('connection', function(socket) {
    console.log('new connection');
});

//Start Server
http.listen(port, function () {
    console.log('Server listening at port %d', port);
});