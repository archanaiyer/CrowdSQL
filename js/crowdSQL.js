socket = io.connect('http://localhost:8080');

currentQuestions = "";
numQuestions = 0;
newQuestion = "";

socket.on('start', function (streamOfQuestions, numQuestions) {
id = socket.socket.sessionid;
currentQuestions = streamOfQuestions;
//newQuestion =JSON.parse(currentQuestions[0]);
this.numQuestions = numQuestions;
initialLoad(currentQuestions);
socket.emit('requestMoreConnections');
});

socket.on('newQuestion', function(question) {
//    console.log("NEWQUESTION");
    newQuestion = question;
    console.log(newQuestion);
    draw();
});

socket.on('fetchedOldQuestion', function(question) {
    console.log("fetchedOldQuestion");
    newQuestion = question;
});


function draw() {
    $("#survey li:last-child").remove();

   parsed = JSON.parse(newQuestion);

    question = parsed.question;
    answers = [];

    answers.push(parsed.answer1);
    answers.push(parsed.answer2);
    answers.push(parsed.answer3);
    answers.push(parsed.answer4);
    values = parsed.value1.split(",");

    socket.emit('requestMoreConnections');
    loadSurveyGraphs(question, answers, values, 4);
}


s = setInterval(draw, 1000);

function initialLoad(data) {
    //console.log(data);
  //  data = JSON.parse(data);

    i = 0;
    var data_length = Object.keys(data).length;
    for (var i = 0; i < data_length; i++) {
  
        parsed = JSON.parse(data[i]);
        question = parsed.question;
        answers = [];

        answers.push(parsed.answer1);
        answers.push(parsed.answer2);
        answers.push(parsed.answer3);
        answers.push(parsed.answer4);
        values = parsed.value1.split(",");


        loadSurveyGraphs(question, answers, values, i);

    }

}

function loadSurveyGraphs(question, answers, results, i) {
    var part1 = '<li><div class=" question row"><h3>';
    var part2 = '</h3></div><div class="results row">';
    var index = (i * 4) + 1;
    var graph1 = '<svg id="fillgauge' + i + '"></svg>';
    var graph2 = '<svg id="fillgauge' + (i + 1) + '"></svg>';
    var graph3 = '<svg id="fillgauge' + (i + 2) + '"></svg>';
    var graph4 = '<svg id="fillgauge' + (i + 3) + '"></svg>';
    var part3 = '</div><div class="answer row graphlabel">';
    var label1 = '<div class="col-md-3">' + answers[0] + '</div>';
    var label2 = '<div class="col-md-3">' + answers[1] + '</div>';
    var label3 = '<div class="col-md-3">' + answers[2] + '</div>';
    var label4 = '<div class="col-md-3">' + answers[3] + '</div>';
    var part4 = '</li>';
    $('#survey').prepend(part1 + question + part2 + graph1 + graph2 + graph3 + graph4 + part3 + label1 + label2 + label3 + label4 + part4);
    loadLiquidFillGauge("fillgauge" + i, results[0], config1);
    loadLiquidFillGauge("fillgauge" + (i + 1), results[1], config2);
    loadLiquidFillGauge("fillgauge" + (i + 2), results[2], config3);
    loadLiquidFillGauge("fillgauge" + (i + 3), results[3], config4);
}



// $(document).ready(function() {
 
    window.odometerOptions = {
      auto: false, // Don't automatically initialize everything with class 'odometer'
      format: '(,ddd).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
      duration: 3000, // Change how long the javascript expects the CSS animation to take
      animation: 'count' // Count is a simpler animation method which just increments the value,
                     // use it when you're looking for something more subtle.
    };

    var odomEl = document.querySelector('#odometer-item');
    od = new Odometer({
      el: odomEl,
      value: 10
    });

    var odomEl = document.querySelector('#odometer-item');
    od = new Odometer({
      el: odomEl,
      value: 10
    });

    // od.update = 555;
    var config1 = liquidFillGaugeDefaultSettings();
    config1.circleColor = "#FF7777";
    config1.textColor = "#FF4444";
    config1.waveTextColor = "#FFAAAA";
    config1.waveColor = "#FFDDDD";
    config1.circleThickness = 0.1;
    config1.textVertPosition = 0.5;
    config1.waveAnimateTime = 1000;

    var config2 = liquidFillGaugeDefaultSettings();
    config2.circleColor = "##91c8ff";
    config2.textColor = "#91c8ff";
    config2.waveTextColor = "##91c8ff";
    config2.waveColor = "#ddeeff";
    config2.circleThickness = 0.1;
    config2.circleFillGap = 0.1;
    config2.textVertPosition = 0.5;
    config2.waveAnimateTime = 2000;
    config2.waveHeight = 0.3;

    var config3 = liquidFillGaugeDefaultSettings();
    config3.circleColor = "#9a9a9a";
    config3.textColor = "#9a9a9a";
    config3.waveTextColor = "##91c8ff";
    config3.waveColor = "#e6e6e6";
    config3.circleThickness = 0.1;
    config3.circleFillGap = 0.1;
    config3.textVertPosition = 0.5;
    config3.waveAnimateTime = 2000;
    config3.waveHeight = 0.3;

    var config4 = liquidFillGaugeDefaultSettings();
    config4.circleColor = "#3535ff";
    config4.textColor = "#3535ff";
    config4.waveTextColor = "##91c8ff";
    config4.waveColor = "#cfcfff";
    config4.circleThickness = 0.1;
    config4.circleFillGap = 0.1;
    config4.textVertPosition = 0.5;
    config4.waveAnimateTime = 2000;
    config4.waveHeight = 0.3;

// <<<<<<< HEAD
//     results = [{
//         "question": "Hawaii?",
//         "Lol": 10,
//         "No": 10,
//         "Sure": 10,
//         "Maybe": 15
//     }, {
//         "question": "Bananas",
//         "Totes": 14,
//         "Oyeah": 40,
//         "Ew": 30,
//         "Potato": 45
//     }, {
//         "question": "Sleep?",
//         "It's for losers": 14,
//         "Oyeah": 40,
//         "YESSS": 30,
//         "<3": 45
//     }];
// =======
//     results = [{"question":"Hawaii?","Lol":10,"No":10,"Sure":10,"Maybe":15},{"question":"Bananas","Totes":14,"Oyeah":40,"Ew":30,"Potato":45},{"question":"Sleep?","It's for losers":14,"Oyeah":40,"YESSS":30,"<3":45}];
    // initialLoad(results);


  setTimeout(function(){ 
  var interval = setInterval(function(){
        var val = od.value;
        // console.log(val + ": ");
        od.update((val + 1));
        }, 1000);    
}, 1500);

});


//});
