

$( document ).ready(function() {

 

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

    results = [{"question":"Hawaii?","Lol":10,"No":10,"Sure":10,"Maybe":15},{"question":"Bananas","Totes":14,"Oyeah":40,"Ew":30,"Potato":45},{"question":"Sleep?","It's for losers":14,"Oyeah":40,"YESSS":30,"<3":45}];
    initialLoad(results);

    function initialLoad(data){   
        i=0;
        var data_length = Object.keys(data).length;
        for(var i = 0; i<data_length; i++){
            answers=[];
            results=[];
            index = 0;
            question = "";
            $.each(data[i], function(key, value){
                if (key == "question"){
                    question = value;
                }
                else{
                    answers[index] = key;
                    results[index] = value;
                    index++;
                }
            });
            loadSurveyGraphs(question,answers,results, i);
        }
        
    }

    setInterval(function(){
      $("#survey li:last-child").remove();
      loadSurveyGraphs("TEST", ["ya","yes","no","mmmm"],[60,60,60,60],4);
    }, 10000);
    
    
    function loadSurveyGraphs(question, answers, results, i){

        var part1 = '<li><div class=" question row"><h3>';
        var part2 = '</h3></div><div class="results row">';
        var index = (i*4) + 1;
        var graph1 = '<svg id="fillgauge'+i+'"></svg>';
        var graph2 = '<svg id="fillgauge'+(i+1)+'"></svg>';
        var graph3 = '<svg id="fillgauge'+(i+2)+'"></svg>';
        var graph4 = '<svg id="fillgauge'+(i+3)+'"></svg>';
        var part3 = '</div><div class="answer row graphlabel">';
        var label1 = '<div class="col-md-3">'+answers[0]+'</div>';
        var label2 = '<div class="col-md-3">'+answers[1]+'</div>';
        var label3 = '<div class="col-md-3">'+answers[2]+'</div>';
        var label4 = '<div class="col-md-3">'+answers[3]+'</div>';
        var part4 = '</li>';
        $('#survey').prepend(part1+question+part2+graph1+graph2+graph3+graph4+part3+label1+label2+label3+label4+part4);
        loadLiquidFillGauge("fillgauge"+i, results[0], config1); 
        loadLiquidFillGauge("fillgauge"+(i+1), results[1], config2);
        loadLiquidFillGauge("fillgauge"+(i+2), results[2], config3);
        loadLiquidFillGauge("fillgauge"+(i+3), results[3], config4);
    }

});



