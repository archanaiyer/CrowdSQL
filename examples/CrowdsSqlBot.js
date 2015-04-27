var twitLib = require('../lib/twitter'),
	config = require('../config1');
var PythonShell = require('python-shell');
Bot = new twitLib(config);

var options = {
	scriptPath: '/Users/danielshlyuger/node_modules/twit/examples/'
};


var stream = Bot.stream('user', {
	track: ['Query_The_Crowd']
}, {
	with: "followings"
})

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

		PythonShell.run('mturkconnector.py', options, function(err, results) {
			if (err) throw err;
		
			console.log(results);
			actualArray = results[1].split(",");
			// console.log(actualArray);
			// results is an array consisting of messages collected during execution 
			mostPopular = 0;
			mostPopularCount = actualArray[0];
			answer = "";
			for (i = 0; i < actualArray.length; i++) {
				if (actualArray[i] > mostPopularCount) {
					mostPopularCount = actualArray[i];
					mostPopular = i;
				}
			}
			// console.log(mostPopular + " , " + mostPopularCount);
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
					status: '@' + tweet.user.screen_name + " The crowd has spoken! " + "You asked " + firstQuestion + " the crowd thinks "
					+ answer,
					in_reply_to_status_id: tweet.id
				},
				function(err, data, response) {
					if (err) {
						console.log("Error");
						console.log(err);
					}
					// console.log(response);
				})
		//	console.log('results: %j', results);
		});
	}
})

stream.on('error', function(error) {
	console.log(error.message);
})