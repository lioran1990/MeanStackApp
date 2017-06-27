var twtConfig = require('./config/twitter_config.json');
var tw = require('node-tweet-stream')(twtConfig);
const mongoose = require('mongoose');
const Tweet = require('./models/tweet');
const dbConfig = require('./config/database');

require('events').EventEmitter.defaultMaxListeners = Infinity;

//Connect to DB using config file
mongoose.connect(dbConfig.database);

//On connection event
mongoose.connection.on('connected',()=>{
    console.log('Connected to database '+ dbConfig.database);
});

//On error (connection to DB)
mongoose.connection.on('error',(err)=>{
    console.log('Database error '+ err);  // exit
    process.exit(1);
});

tw.track('meanstack');
tw.track('nodejs');
tw.track('angular');


tw.on('tweet', function(tweet){
    console.log(tweet);
    
    let newTweet = new Tweet({
        created_at : tweet.created_at,
        tweet_id : tweet.id_str,
        text : tweet.text,
        user_id : tweet.user.id_str,
        user_name : tweet.user.name,
        user_image_url : tweet.user.profile_image_url,
        user_image_url_https : tweet.user.profile_image_url_https
    })

    console.log(newTweet);

    

    Tweet.addTweet(newTweet, (err, data) => {
        if(err){
            console.log("problem");
            console.log(err);
            console.log({success: false, msg:'Failed to create tweet'});
        } else {
            console.log({success: true, msg:'tweet Created'});
        }
    });
});