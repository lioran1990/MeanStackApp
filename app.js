/**
 * Created by Lioran on 6/11/2017.
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport= require('passport');
const mongoose= require('mongoose');
const config= require('./config/database');
const app= express();


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);


//Connect to DB using config file
mongoose.connect(config.database);

//On connection event
mongoose.connection.on('connected',()=>{
    console.log('Connected to database '+ config.database);
});

//On error (connection to DB)
mongoose.connection.on('error',()=>{
    console.log('Database error '+ err);
});

const users= require('./routes/users');
const products = require('./routes/products');
const shops = require('./routes/shops');

//Port Number
const port = 3000;

//CORS Middleware
app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

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
app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

//Start Server
app.listen(port, function () {
    console.log('Server listening at port %d', port);
});