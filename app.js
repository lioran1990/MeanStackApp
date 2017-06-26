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
const Tweet = require('./models/tweet');
const StreamTweets = require('./tweets/stream_tweets_mongoose');

//Connect to DB using config file
mongoose.connect(config.database);

//On connection event
mongoose.connection.on('connected',()=>{
    console.log('Connected to database '+ config.database);
});

//On error (connection to DB)
mongoose.connection.on('error',(err)=>{
    console.log('Database error '+ err);
    // exit
    process.exit(1);
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

// socketio 
io.on('connection', function(socket) {   

    function forwardTweetsToClient(data) {
        console.log(data);
            
        socket.emit('tweet', data)
    }

    StreamTweets.startTailableCursor(forwardTweetsToClient);
});



//Start Server
http.listen(port, function () {
    console.log('Server listening at port %d', port);
});