

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
 
    loadLiquidFillGauge("fillgauge1", 15, config1);
    loadLiquidFillGauge("fillgauge2", 40, config2);
    loadLiquidFillGauge("fillgauge3", 40, config3);
    loadLiquidFillGauge("fillgauge4", 5, config4);
});



