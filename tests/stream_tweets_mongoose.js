const mongoose = require('mongoose');
const Tweet = require('../models/tweet');
const dbConfig = require('../config/database');

function startTailableCursor() {
    const cursor = Tweet
      .find()
      .tailable({ awaitdata : true })
      .cursor();

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
    });
}

//Connect to DB using config file
mongoose.connect(dbConfig.database);

//On connection event
mongoose.connection.on('connected',()=>{
    console.log('Connected to database '+ dbConfig.database);
});

//On error (connection to DB)
mongoose.connection.on('error',(err)=>{
    console.log('Database error '+ err);
});

startTailableCursor();