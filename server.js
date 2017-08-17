require('dotenv').config({ path: '/var/www/tweetSlack/keys.env' });
let express = require('express');
let Twitter = require('twitter');
let bodyParser = require('body-parser');
let port = 8000;

let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

let app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/tweet', (req, res) => {
    client.post('statuses/update', { status: req.body.text })
        .then(tweet => console.log(tweet))
        .catch(error => console.log(error))
    res.end();
})

app.listen(port, () => console.log(`listening on port ${port}...`))
