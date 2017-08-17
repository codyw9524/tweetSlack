let Twitter = require('twitter');
let request = require('request');

let client = new Twitter({
    consumer_key: '1lToxKBjEbRFwOR2nPscQ717b',
    consumer_secret: 'Nb6JH3NUiNhrac1lWLFFxVmhaztA9jHfspxp6nkSOVIGROfWvV',
    access_token_key: '1454645306-Q029LaF9q9sIGjTsNhUiZjZxHkpKcB7VUlUNdJa',
    access_token_secret: 'KXHLkzmHjwzFXccMUONLbydQtGX5wdlSuej8JO58IZX9Q'
});

let stream = client.stream('statuses/filter', { track: '#codydojo' });
stream.on('data', function(event) {
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
                console.log(error);
            }
            return;
        })
    }
});
stream.on('error', function(error) {
    throw error;
});
