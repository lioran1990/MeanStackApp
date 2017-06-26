const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// const juiceSchema = new mongoose.Schema({
//       name: String
//     }, { capped: BYTE_CAP });
const BYTE_CAP = 100000;

const TweetSchema = mongoose.Schema({
    tweet_id: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_image_url: {
        type: String,
        required: true
    },
    user_image_url_https: {
        type: String,
        required: true
    }
},
    // read https://coderwall.com/p/c8cr1q/tailable-cursors-in-mongodb
    // https://docs.mongodb.com/manual/core/capped-collections/
    // https://docs.mongodb.com/manual/core/tailable-cursors/
    { capped: BYTE_CAP } );

const Tweet = module.exports = mongoose.model('Tweet', TweetSchema);

module.exports.getAllTweetsByTime = function({ beginTime }, callback) {
    console.log("Get all tweeted newer than..." + beginTime)
    
    Tweet.find({
            "created": { 
                $gte: beginTime
            }
    }, function (err, tweets) {
        console.log("in find")
        if (err) {
            console.log("cant find");
        } else {
            console.log("success")
            console.log()
            return callback(false, tweets);
        }
    });
}

module.exports.getStream = function({ beginTime }, callback) {
    console.log("Stream all tweets newer than..." + beginTime)
    
    return Tweet.find({
            "created": { 
                $gte: beginTime
            }
    }, function (err, tweets) {
        console.log("in find")
        if (err) {
            console.log("cant find");
        } else {
            console.log("success")
        }
    }).stream();
}

// module.exports.deleteProduct = function(product, callback){

//     Product.remove({serialNumber:product.serialNumber},function (err,callback) {
//         if(err){
//             console.log('error');
//         }else {
//             return callback;
//         }
//     });
//     return callback(false,null);
// }

// module.exports.searchProductsNameCategoryAndPrice= function(product, callback){

//     Product.find({
//         productPrice:{$lt:product.price},
//         productName:{"$regex" : product.name, "$options" : "i"},
//         productCategory:{"$regex" : product.category, "$options" : "i"}
//     },callback);
// }

module.exports.addTweet = function(newTweet, callback) {
    console.log("Add new tweet");
    newTweet.save(callback);
}