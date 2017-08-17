let express = require('express');
let port = 8000;
let Twitter = require('twitter');
// let request = require('request');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }))

let client = new Twitter({
    consumer_key: '1lToxKBjEbRFwOR2nPscQ717b',
    consumer_secret: 'Nb6JH3NUiNhrac1lWLFFxVmhaztA9jHfspxp6nkSOVIGROfWvV',
    access_token_key: '1454645306-Q029LaF9q9sIGjTsNhUiZjZxHkpKcB7VUlUNdJa',
    access_token_secret: 'KXHLkzmHjwzFXccMUONLbydQtGX5wdlSuej8JO58IZX9Q'
});

//set up a post route to receive a request from slack, then post to twitter
app.post('/tweet', (req, res) => {
    console.log(req.body);
    // client.post('statuses/update', {status: req.body.status})
    //     .then(tweet => console.log(tweet))
    //     .catch(error => console.log(error))
    res.end();
})

app.listen(port, () => console.log(`listening on port ${port}...`))
