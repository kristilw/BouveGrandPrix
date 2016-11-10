

var map = null;
var frameTime = 25;

var speed = 0;
var maxAcceleration = 6;

var carImage = null;
var carMarker = null;
var carPostionX = 0;
var carPostionY = 0;


var road = null;
var setUpComplete = false;

var keysPressed = new Map();
var keyEventToId = new Map();
keyEventToId.set(87, "w_key");
keyEventToId.set(83, "s_key");

document.onkeydown = onkeyDown;
document.onkeyup = onKeyUp;


function onkeyDown(e) {
    var event = window.event ? window.event : e;

    keyStatus = keysPressed.get(event.keyCode);
    if (keyStatus === undefined || keyStatus === false) {
        keysPressed.set(event.keyCode, true);

        if (keyEventToId.get(event.keyCode) !== undefined) {
            document.getElementById(keyEventToId.get(event.keyCode)).style.opacity = "1";
        }
    }
}

function onKeyUp(e) {
    var event = window.event ? window.event : e;

    keyStatus = keysPressed.get(event.keyCode);
    if (keyStatus === undefined || keyStatus === true) {
        keysPressed.set(event.keyCode, false);

        if (keyEventToId.get(event.keyCode) !== undefined) {
            document.getElementById(keyEventToId.get(event.keyCode)).style.opacity = "0.5";
        }
    }
}


function handleAcceleration(){
    keysPressed.forEach(function (item, key, mapObj) {
        if (item === true) {
            var keyPressed = keyEventToId.get(key);
            if (keyPressed === "w_key") {
                speed += maxAcceleration*frameTime/1000;
            } else if (keyPressed === "s_key") {
                speed -= maxAcceleration*frameTime/1000;
            }
        }
    });
}


var time = 0;
var beizerCounter = 0;
var beizerTime = 0;

setInterval(function () {
    if (setUpComplete === true) {
        time += frameTime;
        console.log("time: " + time);
  
        /*var lon_new = parseFloat(road[0].lon);
        lon_new += speed*0.00001*0;
        var p = {
            lat: road[0].lat,
            lon: lon_new
        }

        var angle = speed*Math.PI/180*10;
        console.log("angle: " + (angle*180/Math.PI));
        MoveCar(p, angle);
        console.log(speed);*/

        var timeLeft = frameTime;
        var carNewPosition = null;
        var carNewAngle = null;

        var safetyCounter = 0;

        console.log("speed: "+speed);
        while (beizerCounter < road.length && timeLeft > 0 && Math.abs(speed) > 0 && safetyCounter < 100) {
            
            safetyCounter += 1;

            var pCurrent = road[beizerCounter];
            var pNext = road[beizerCounter+1];
            var pNextNext = road[beizerCounter+2];
            

            if ((pCurrent.type === 'p0' || pCurrent.type === 'b2') && (pNext.type === 'p0' || pNext.type === 'b0')) {
                console.log("line detected");

                var lengthToTravel = speed * timeLeft * 0.001;
                var distanceInBeizerTime = LineTime(pCurrent, pNext, lengthToTravel);

                if (beizerTime + distanceInBeizerTime > 1) {
                    beizerCounter+=1;
                    distanceInBeizerTime = 1 - beizerTime;
                    beizerTime = 0;
                    timeLeft -= distanceInBeizerTime;
                } else {
                    timeLeft = 0;
                    beizerTime += distanceInBeizerTime;

                    carNewPosition = GetPostionByLineAndTime(pCurrent, pNext, beizerTime);
                    carNewAngle = GetAngleLine(pCurrent, pNext);

                    console.log(beizerTime);
                    break;
                }
            } else if (pCurrent.type === 'b0' && pNext.type === 'b1' && pNextNext.type === 'b2') {
                console.log("curve detected");

                var lengthToTravel = speed * timeLeft * 0.001;
        
                var lengthOfTurn = BeizerCurveQudraticDistance_between(pCurrent, pNext, pNextNext, beizerTime, 1);
                var lengthOfTotalTurn = BeizerCurveQudraticDistance_between(pCurrent, pNext, pNextNext,0,1);

                var timeLeftOfTurn = 1-beizerTime;

                if(lengthOfTurn < lengthToTravel){
                    beizerCounter+=2;
                    beizerTime = 0;
                    timeLeft-= timeLeftOfTurn;
                } else {
                    
                    var firstGuessBeizerTime = beizerTime + lengthToTravel / lengthOfTotalTurn;

                    beizerTime = firstGuessBeizerTime;
                    timeLeft = 0;
                    
                    carNewPosition = BeizerCurveQuadratic(pCurrent, pNext, pNextNext, beizerTime);
                    carNewAngle = GetAngleBeizerCurve(pCurrent, pNext, pNextNext, beizerTime);

                    console.log(beizerTime);
                    break;
                }
            }

            if (safetyCounter === 100) {
                console.log("ERROR: saftyCounter");
                console.log("beizerTime: "+beizerTime);
                console.log("pCurrent.type: " + pCurrent.type);
                console.log("pNext.type: " + pNext.type);
                console.log("pNextNext.type: " + pNextNext.type);
            }
        }
        
        handleAcceleration();

        if (carNewPosition !== null) {
            console.log("angle: "+carNewAngle);
            MoveCar(carNewPosition, carNewAngle);
            map.panTo(carNewPosition);
        }
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
    carImage = new Image();
    carImage.onload = function () {
        var width = carImage.width * img_scale;
        var height = carImage.height * img_scale;

        var img_r = rotateImg(carImage, Math.PI * 0.3);
        img_r.onload = function () {
            var carMarkerIcon = L.icon({
                iconUrl: img_r.src,
                iconSize: [width, height], // size of the icon
                iconAnchor: [width / 2, height / 2], // point of the icon which will correspond to marker's location
                popupAnchor: [width / 2, -height / 2] // point from which the popup should open relative to the iconAnchor
            });

            carMarker = L.marker([59.935, 10.7585], { icon: carMarkerIcon }).addTo(map);
        }
    };
    carImage.src = '../img/car_w_1.png';



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
    var image_length = Math.sqrt(Math.pow(image.width, 2) + Math.pow(image.height, 2));

    var image_big = image.width > image.height ? image.width : image.height;
    var image_small = image.width < image.height ? image.width : image.height;

    var image_scaleFactor = image_big / image_small;

    canvas.width = image.width * image_scaleFactor;
    canvas.height = image.height * image_scaleFactor;

    var context = canvas.getContext("2d");
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(angle);
    context.translate(-canvas.width / 2, -canvas.height / 2);
    context.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height/2 - image.height / 2);

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

function MoveCar(p, angle) {
    if (carImage !== null && map !== null && carMarker!=null) {
        carMarker.setLatLng([p.lat, p.lon]);

        var newCarMarker = null;
        var img_scale = 0.2;
        var width = carImage.width * img_scale;
        var height = carImage.height * img_scale;

        var img_r = rotateImg(carImage, angle);
        img_r.onload = function () {
            var carMarkerIcon = L.icon({
                iconUrl: img_r.src,
                iconSize: [width, height], // size of the icon
                iconAnchor: [width / 2, height / 2], // point of the icon which will correspond to marker's location
                popupAnchor: [width / 2, -height / 2] // point from which the popup should open relative to the iconAnchor
            });

            newCarMarker = L.marker(carMarker.getLatLng(), { icon: carMarkerIcon }).addTo(map);
            map.removeLayer(carMarker);
            carMarker = newCarMarker;
        }
    } else {
        console.log("car image has not been loaded");
    }
}

var besizerCounter = 0;


function BeizerCurveQuadratic(p1, p2, p3, t) {
    return {
        'lat': (Math.pow((1 - t),2) * p1.lat + 2 * (1 - t) * t * p2.lat + p3.lat * Math.pow(t, 2)),
        'lon': (Math.pow((1 - t),2) * p1.lon + 2 * (1 - t) * t * p2.lon + p3.lon * Math.pow(t, 2))
    };
}

function GetPostionByLineAndTime(p1, p2, t) {
    return {
        'lat': (1 - t) * p1.lat + t * p2.lat,
        'lon': (1 - t) * p1.lon + t * p2.lon
    };
}


function LineTime(p1, p2, l) {
    return l / GetDistanceBetweenCoordinates_m(p1, p2);
}

function LineDistance(p1, p2, tTo) {
    return LineDistance(p1, p2, 0, tTo);
}

function LineDistance(p1, p2, tFrom, tTo) {
    return GetDistanceBetweenCoordinates_m(p1, p2) * (tTo - tFrom);
}

var timeStep = 0.02;
function BeizerCurveQudraticDistance(p1, p2, p3) {
    return BeizerCurveQudraticDistance_between(p1, p2, p3, 0, 1);
}

function BeizerCurveQudraticDistance_to(p1, p2, p3, tTo) {
    return BeizerCurveQudraticDistance_between(p1, p2, p3, 0, tTo);
}

function BeizerCurveQudraticDistance_between(pA, pB, pC, tFrom, tTo) {
    var sumDistance = 0;

    var p1 = BeizerCurveQuadratic(pA, pB, pC, tFrom);
    for (var t = tFrom + timeStep; t < tTo; t += timeStep) {
        
        var p2 = BeizerCurveQuadratic(pA, pB, pC, t);
        sumDistance += GetDistanceBetweenCoordinates_m(p1, p2);
        p1 = p2;
    }
    var p2 = BeizerCurveQuadratic(pA, pB, pC, tTo);
    sumDistance += GetDistanceBetweenCoordinates_m(p1, p2);
    return sumDistance;
}


function GetAngleBeizerCurve(p1,p2,p3,t) {
    var tb = Math.max(0, t - 0.001);
    var tf = Math.min(1, t + 0.001);

    var pb = BeizerCurveQuadratic(p1, p2, p3, tb);
    var pf = BeizerCurveQuadratic(p1, p2, p3, tf);

    return GetAngleLine(pb, pf);
}

function GetAngleLine(p1, p2) {
    var p1_m = CoordinatesToMeter(p1);
    var p2_m = CoordinatesToMeter(p2);

    var deltaLat_m = parseFloat(p1_m.lat_m) - parseFloat(p2_m.lat_m);
    var deltaLon_m = parseFloat(p2_m.lon_m) - parseFloat(p1_m.lon_m);

    var angle = GetAngle(deltaLon_m, deltaLat_m, -1, 0);

    var angle_deg = angle * 180 / Math.PI;
    console.log("deltaLon_m: " + deltaLon_m + "  deltaLat_m: " + deltaLat_m + " angle_deg: " + angle_deg);
    return angle;
}

var earthCircumference_m = 40000;

function CoordinatesToMeter(p) {
    var lat_m = p.lat * earthCircumference_m ;
    var lon_m = p.lon * earthCircumference_m * Math.cos(Math.PI / 180 * p.lat);

    return {
        'lat_m': lat_m,
        'lon_m': lon_m
    }
}

function GetDistanceBetweenCoordinates_m(p1, p2) {
    var deltaLat = p1.lat - p2.lat;
    var deltaLon = p1.lon - p2.lon;
    
    var deltaLat_m = deltaLat * earthCircumference_m;
    var detlaLon_m = deltaLon * earthCircumference_m * Math.cos(Math.PI / 180 * p1.lat);
    return Math.sqrt(Math.pow(deltaLat_m, 2) + Math.pow(detlaLon_m, 2));
}

function GetAngle(ab_x, ab_y, bc_x, bc_y) {
    var ans = (Math.atan2(ab_y, ab_x) - Math.atan2(bc_y, bc_x));
    return (((ans + 3 * Math.PI) % (2 * Math.PI)) - Math.PI);
}