var twitLib = require('../lib/twitter'),
	config = require('../config1');
var PythonShell = require('python-shell');
Bot = new twitLib(config);
var redis = require("redis"),
	client = redis.createClient();
var express = require('express');

var uuid = require('node-uuid');
app = express(), server = require('http').createServer(app), io = require('socket.io').listen(server);

totalResults = 0;

client.lrange('questions', 0, -1, function(err, result) {
	if (err) {
		console.log(error);
	} else {
		totalResults = result;
		//console.log(result[4]["value1"]);
	}
});


function drawClients() {
	toSend = totalResults.shift();
	totalResults.push(toSend);
	io.sockets.emit('fetchedOldQuestion', toSend);
}

s = setInterval(drawClients,1000);



//console.log(io.sockets);
server.listen(8080);
io.set('log level', 1);

io.sockets.on('connection', function(socket) {
	curSocket = socket.id;
	io.sockets.socket(curSocket).emit('start', totalResults.slice(0, 3), totalResults.length);
});

var options = {
	scriptPath: '/Users/danielshlyuger/node_modules/twit/examples/'
};


var stream = Bot.stream('user', {
	track: ['Query_The_Crowd']
}, {
	with: "followings"
})

function question(question, answer1, value1, answer2, value2, answer3, value3, answer4, value4, timestamp) {

	this.question = question;

	this.answer1 = answer1;
	this.value1 = value1;

	this.answer2 = answer2;
	this.value2 = value2;

	this.answer3 = answer3;
	this.value3 = value3;

	this.answer4 = answer4;
	this.value4 = value4;

	this.timestamp = timestamp;
}

stream.on('tweet', function(tweet) {

	var regex = /(@Query_The_Crowd(.|\n)*)/i;
	var found = tweet.text.match(regex);
	//	var args = found.split()
	if (found != null) {
		var res = tweet.text.split(",");
		//console.log(res);

		var Mention = res[0].toLowerCase().indexOf("@query_the_crowd");
		var firstQuestion = res[0].substring(Mention + "Query_The_Crowd".length + 1);


		var options = {
			args: [firstQuestion, res[1], res[2], res[3], res[4]]
		};
		console.log("GOT TWEET");

		PythonShell.run('mturkconnector.py', options, function(err, results) {


			if (err) throw err;
			console.log(results);

			actualArray = results[0].split(",");
			toStore = new question(firstQuestion, res[1], results[0], res[2],
				results[1], res[3], results[2], res[4], results[3], Date.now());
			client.rpush('questions', JSON.stringify(toStore));
			totalResults.unshift(JSON.stringify(toStore));
			console.log(JSON.stringify(toStore));

			//io.sockets.emit('newQuestion', JSON.stringify(toStore));

			mostPopular = 0;
			mostPopularCount = actualArray[0];
			answer = "";
			for (i = 0; i < actualArray.length; i++) {
				if (actualArray[i] > mostPopularCount) {
					mostPopularCount = actualArray[i];
					mostPopular = i;
				}
			}

			switch (mostPopular) {
				case 0:
					answer = res[1];
					break;
				case 1:
					answer = res[2];
					break;
				case 2:
					answer = res[3];
					break;
				case 3:
					answer = res[4];
					break;

			}
			Bot.post('statuses/update', {
					status: '@' + tweet.user.screen_name + " The crowd has spoken! " + "You asked " + firstQuestion + " the crowd thinks " + answer,
					in_reply_to_status_id: tweet.id
				},
				function(err, data, response) {
					if (err) {
						console.log("Error");
						console.log(err);
					}
				})
		});
	}
})

stream.on('error', function(error) {
	console.log(error.message);
})