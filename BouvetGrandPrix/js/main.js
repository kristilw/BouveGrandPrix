

var map = null;
var frameTime = 33.33;

var speed = 0;
var acceleration = 0;

var carPostionX = 0;
var carPostionY = 0;

//Time-event
setInterval(function () {
    console.log("hey");
}, frameTime*100);

window.onload = function () {
    map = L.map('map').setView([59.935, 10.7585], 15);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbHciLCJhIjoiY2l1dmw3aWttMDAwcjJ1cXc3bmZrMnExdCJ9.cxPXQumqqwNRhfWsj0Clvg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);

    var marker = L.marker([59.935, 10.7585]).addTo(map);

    var p1_ = { 'x': 0, 'y': 0 };
    var p2_ = { 'x': 1, 'y': 10 };
    var p3_ = { 'x': 2, 'y': 20 };
    var p = BeizerCurveQuadratic(p1_, p2_, p3_, 0.5);

    console.log("x: " + p.x);
    console.log("y: " + p.y);
}


var besizerCounter = 0;


function BeizerCurveQuadratic(p1, p2, p3, t) {
    return {
        'x': ((1 - t*t) * p1.x + 2 * (1 - t) * t * p2.x + p3.x * t*t),
        'y': ((1 - t*t) * p1.y + 2 * (1 - t) * t * p2.y + p3.y * t*t)
    };
}

function BeizerCurveQudraticDistance(p1, p2, p3, t0, t1) {
    return {
        'x': ((1 - t * t) * p1.x + 2 * (1 - t) * t * p2.x + p3.x * t * t),
        'y': ((1 - t * t) * p1.y + 2 * (1 - t) * t * p2.y + p3.y * t * t)
    };
}