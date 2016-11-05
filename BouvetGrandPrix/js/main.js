

var map = null;
var frameTime = 33.33;

var speed = 0;

var carPostionX = 0;
var carPostionY = 0;

var setUpComplete = false;

var carMarker = null;

var keysPressed = new Map();
var keyEventToId = new Map();
keyEventToId.set(87, "w_key");
keyEventToId.set(83, "s_key");

document.onkeydown = onkeyDown;
document.onkeyup = onKeyUp;


function onkeyDown(e) {
    var event = window.event ? window.event : e;

    keyStatus = keysPressed.get(event.keyCode);
    console.log(keyStatus);
    if (keyStatus === undefined || keyStatus === false) {
        keysPressed.set(event.keyCode, true);
        console.log(event.keyCode)

        if (keyEventToId.get(event.keyCode) !== undefined) {
            document.getElementById(keyEventToId.get(event.keyCode)).style.opacity = "1";
        }
    }
}

function onKeyUp(e) {
    var event = window.event ? window.event : e;

    keyStatus = keysPressed.get(event.keyCode);
    console.log(keyStatus)
    if (keyStatus === undefined || keyStatus === true) {
        keysPressed.set(event.keyCode, false);
        console.log(event.keyCode)

        if (keyEventToId.get(event.keyCode) !== undefined) {
            document.getElementById(keyEventToId.get(event.keyCode)).style.opacity = "0.5";
        }
    }
}


function handleAcceleration(){
    keysPressed.forEach(function (item, key, mapObj) {
        map.removeLayer(item.marker);
        if (item === true) {
            var keyPressed = keyEventToId.get(key);
            if (keyPressed === "w_key") {
                speed += 0.1;
            } else if (keyPressed === "s_key") {
                speed -= 0.1;
            }
        }
    });
    console.log(speed);
}

//Time-event
setInterval(function () {
    if (setUpComplete === true) {
        //handleAcceleration();
    }
}, frameTime);

window.onload = function () {
    map = L.map('map').setView([59.935, 10.7585], 15);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbHciLCJhIjoiY2l1dmw3aWttMDAwcjJ1cXc3bmZrMnExdCJ9.cxPXQumqqwNRhfWsj0Clvg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);

    //var marker = L.marker([]).addTo(map);

    var img_scale = 0.2;
    var img = new Image();
    img.onload = function () {
        var width = img.width * img_scale;
        var height = img.height * img_scale;

        var img_r = rotateImg(img, Math.PI*0.3);
        img_r.onload = function () {
            carMarker = L.icon({
                iconUrl: img_r.src,
                iconSize: [width, height], // size of the icon
                iconAnchor: [width / 2, height / 2], // point of the icon which will correspond to marker's location
                popupAnchor: [width / 2, -height / 2] // point from which the popup should open relative to the iconAnchor
            });

            L.marker([59.935, 10.7585], { icon: carMarker }).addTo(map);
        }
    };
    img.src = '../img/car_w_1.png';



    $.ajax({
        url: "../roads/road.csv",
        async: false,   // asynchronous request? (synchronous requests are discouraged...)
        cache: false,   // with this, you can force the browser to not make cache of the retrieved data
        dataType: "text",  // jQuery will infer this, but you can set explicitly
        success: readCSVfile
    });

    
}

function rotateImg(image, angle) {
    var canvas = document.createElement("canvas");
    canvas.width = image.width*2;
    canvas.height = image.height*2;

    var context = canvas.getContext("2d");
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(angle);
    context.translate(-canvas.width / 2, -canvas.height / 2);
    context.drawImage(image, image.width / 2, image.height / 2);

    var newImage = new Image();
    newImage.src = canvas.toDataURL("image/png");

    return newImage;
}


function readCSVfile(csv) {
    road = $.csv.toObjects(csv);
    console.log(road);
    printRoadToMap(road);
}

function printRoadToMap(road) {
    roadSections_length = road.length;
    for (var i = 0; i < roadSections_length-3; i++) {
        roadPoint_A = road[i];
        roadPoint_B = road[i + 1];
        roadPoint_C = road[i + 2];

        if ((roadPoint_A.type === 'p0' || roadPoint_A.type === 'b2') && (roadPoint_B.type === 'p0' || roadPoint_B.type === 'b0')) {
            var pointA = new L.LatLng(roadPoint_A.lat, roadPoint_A.lon);
            var pointB = new L.LatLng(roadPoint_B.lat, roadPoint_B.lon);
            var pointList = [pointA, pointB];

            var firstpolyline = new L.Polyline(pointList, {
                color: 'orange',
                weight: 3,
                opacity: 1,
                smoothFactor: 1

            });
            firstpolyline.addTo(map);
        } else if (roadPoint_A.type === 'b0') {
            var pointList = [];
            for (var t = 0; t <= 1; t += 0.2) {
                var p1 = BeizerCurveQuadratic(roadPoint_A, roadPoint_B, roadPoint_C, t);
                pointList.push(new L.LatLng(p1.lat, p1.lon));
            }
            var firstpolyline = new L.Polyline(pointList, {
                color: 'orange',
                weight: 3,
                opacity: 1,
                smoothFactor: 1

            });
            firstpolyline.addTo(map);

            i += 1;
        }else{
            console.log("err: " + roadPoint_A.type)
        }
    }
    setUpComplete = true;
}

var besizerCounter = 0;


function BeizerCurveQuadratic(p1, p2, p3, t) {
    return {
        'lat': (Math.pow((1 - t),2) * p1.lat + 2 * (1 - t) * t * p2.lat + p3.lat * Math.pow(t, 2)),
        'lon': (Math.pow((1 - t),2) * p1.lon + 2 * (1 - t) * t * p2.lon + p3.lon * Math.pow(t, 2))
    };
}

function BeizerCurveQudraticDistance(p1, p2, p3, t0, t1) {
    return {
        'x': ((1 - t * t) * p1.x + 2 * (1 - t) * t * p2.x + p3.x * t * t),
        'y': ((1 - t * t) * p1.y + 2 * (1 - t) * t * p2.y + p3.y * t * t)
    };
}