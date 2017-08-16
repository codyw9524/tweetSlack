let express = require('express');
let port = 8000;
let Twitter = require('twitter');
let request = require('request');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded())

let client = new Twitter({
    consumer_key: '1lToxKBjEbRFwOR2nPscQ717b',
    consumer_secret: 'Nb6JH3NUiNhrac1lWLFFxVmhaztA9jHfspxp6nkSOVIGROfWvV',
    access_token_key: '1454645306-Q029LaF9q9sIGjTsNhUiZjZxHkpKcB7VUlUNdJa',
    access_token_secret: 'KXHLkzmHjwzFXccMUONLbydQtGX5wdlSuej8JO58IZX9Q'
});
// let params = { screen_name: 'nodejs' };
let stream = client.stream('statuses/filter', { track: '#codydojo' });
stream.on('data', function(event) {
    console.log('*******************************************************')
    console.log('event :', event);
    //url is at event.entities.urls.expanded_url
    if(event){
        let id = event.id_str;
        let user = event.user.screen_name
        let slackPost = {
            "text": `https://twitter.com/${user}/status/${id}`
        }
        let clientServerOptions = {
            uri: "https://hooks.slack.com/services/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",
            body: JSON.stringify(slackPost),
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            }
        }
        request(clientServerOptions, (error, response) => {
            if(error){
                console.log('error : ', error);
            }
            else if(response){
                console.log('response :', response);
            }
            return;
        })
    }
});
stream.on('error', function(error) {
    throw error;
});

//set up a post route to receive a request from slack, then post to twitter
app.post('/tweet', (req, res) => {
    console.log(req.body);
    client.post('statuses/update', { status: 'First Test' })
        .then(tweet => console.log(tweet))
        .catch(error => throw error)
    res.end();
})

app.listen(port, () => console.log(`listening on port ${port}...`))
