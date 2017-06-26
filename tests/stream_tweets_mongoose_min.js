const StreamTweets = require('../tweets/stream_tweets_mongoose');

StreamTweets.startTailableCursor(console.log);