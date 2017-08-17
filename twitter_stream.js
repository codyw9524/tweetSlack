require('dotenv').config({ path: '/var/www/tweetSlack/keys.env' })
let Twitter = require('twitter');
let request = require('request');

let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

let stream = client.stream('statuses/filter', { track: '#codydojo' });
stream.on('data', (event) => {
    if(event){
        let id = event.id_str;
        let user = event.user.screen_name
        let slackPost = {
            "text": `https://twitter.com/${user}/status/${id}`
        }
        let clientServerOptions = {
            uri: process.env.SLACK_WEBOOK_URL,
            body: JSON.stringify(slackPost),
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            }
        }
        request(clientServerOptions, (error, response) => {
            if(error){
                console.log(error);
            }
            return;
        })
    }
});
stream.on('error', (error) => {
    throw error;
});
