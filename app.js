require('dotenv').load();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
var AccessToken = require('twilio').AccessToken;
var ConversationsGrant = AccessToken.ConversationsGrant;
// var VideoGrant = AccessToken.VideoGrant;

// var serverOptions = {
// 	key: fs.readFileSync('server.key'),
// 	cert: fs.readFileSync('server.crt'),
// 	passphrase: 'supertest'	
// }

// const server = require ('https').createServer(serverOptions, app);
const server = require ('http').createServer(app);
const io = require('socket.io')(server);

module.exports = app;

//for the peer server
var options = {
	debug: true,
}

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'browser')));
app.use(express.static(path.join(__dirname, 'jsmpeg')));


//serves up the HTML
app.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/token', function(req, res, next){
	var identity = 'live_stream';

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
    	process.env.TWILIO_ACCOUNT_SID,
    	process.env.TWILIO_API_KEY,
    	process.env.TWILIO_API_SECRET
    	);

    //assign the generated identity to the token
    token.identity = identity;

    //grant access to Video
    var grant = new ConversationsGrant();
    grant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response
    res.send({
    	identity: identity,
    	token: token.toJwt()
    });
});


// websocket stuff here. displays dis/connect
io.on('connection', function(peer){
	console.log(peer.id, 'connected');
});

io.on('disconnect', function(peer){
	console.log(peer.id, 'disconnected');
})

var port = process.env.PORT || 3030;

server.listen(port, function(){
	console.log('listening on *:3030');
});