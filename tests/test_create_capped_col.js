const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbConfig = require('../config/database');

// const juiceSchema = new mongoose.Schema({
//       name: String
//     }, { capped: BYTE_CAP });
const BYTE_CAP = 10000;

const CappedSchema = mongoose.Schema({
    name: String
}, { capped: BYTE_CAP } );

const Capped = module.exports = mongoose.model('Capped', CappedSchema);

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

for (let i = 0; i < 1000; i++) {
    // console.log(tweet);
    
    let newCapped = { name: `Capped${i}` };

    console.log(newCapped);

    Capped.create(newCapped);
}