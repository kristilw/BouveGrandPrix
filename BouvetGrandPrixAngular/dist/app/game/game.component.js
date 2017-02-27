"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var GameComponent = (function () {
    function GameComponent(route, router) {
        this.route = route;
        this.router = router;
        this.subscription = null;
        this.setUpComplete = false;
        this.frameTime_milli = 30;
        this.car_img_scale = 0.10;
        this.car_img_original = null;
        this.car_img_elem = null;
        this.car_resistance_square = 0.0015;
        this.car_resistance_linear = 0.1;
        this.car_img_id = 0;
        this.car_speed = 0;
        this.car_maxAcceleration = 18;
        this.car_grip = 700;
        this.minimumSpeedLimit = 20;
        this.gameLoopInterval = null;
        this.speedometer_needle_img = null;
        this.speedometer_needle_img_loaded = false;
        this.speedometer_needle_img_path = 'img/needle';
        this.speedometer_needle_img_scale = 0.1;
        this.speedometer_maxSpeed = 80;
        this.roadWidth = 3;
        this.roadWidth_inital = 1;
        this.zoomToStartAreaWhenRestarting = false;
        this.zoomedToStartArea = false;
        this.gameLogic = new GameLogic_helperClass();
        this.showCountDownTimer = false;
        this.showGoal = false;
        this.showWoops = false;
        this.isTouchDevice = false;
        this.keyPressTimer = null;
        this.keysPressed = new Map();
        this.keyEventToId = new Map();
        this.gameTime = 0;
        this.beizerCounter = 0;
        this.beizerTime = 0;
        this.lastPan = 0;
        this.updatePan = true;
        this.unixTimeOld = 0;
        this.completionTime = null;
        this.tempPolyline = null;
        this.speedLimit_lookahead = 60;
        this.roadSections = new Map();
        this.zoomLevel = 17;
        this.finishedFirstZoomAnimation = false;
    }
    GameComponent.prototype.mobileAndTabletcheck = function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isTouchDevice = this.mobileAndTabletcheck();
        this.map_game = L.map('map_game', {
            center: L.latLng(59.91902, 10.74857),
            zoomControl: false,
            fadeAnimation: true,
            zoomAnimation: true,
            zoomAnimationThreshold: 20,
            zoom: 13,
            maxZoom: 20,
            attributionControl: false
        });
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbHciLCJhIjoiY2l1dmw3aWttMDAwcjJ1cXc3bmZrMnExdCJ9.cxPXQumqqwNRhfWsj0Clvg', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 20
        }).addTo(this.map_game);
        if (this.isTouchDevice !== true) {
            L.control.attribution({ position: 'topright' }).addTo(this.map_game);
        }
        this.zoomToStartArea();
        this.speedometer_needle_img = new Image();
        this.speedometer_needle_img.onload = (function () {
            _this.speedometer_needle_img_loaded = true;
            _this.updateSpeedometer(0);
        });
        this.speedometer_needle_img.src = '../app/img/Speedometernal_liten.png';
        document.onkeydown = (function (e) {
            var event = null;
            event = window.event ? window.event : e;
            _this.onkeyDown(event.keyCode);
        });
        document.onkeyup = (function (e) {
            var event = null;
            event = window.event ? window.event : e;
            _this.onKeyUp(event.keyCode);
        });
        this.keyEventToId.set(38, "w_key");
        this.keyEventToId.set(40, "s_key");
        this.readCSVfile(this.gameLogic.initRoad());
        this.gameLoopInterval = setInterval(function () { _this.gameLoop(); }, this.frameTime_milli);
        var that = this;
        $(document).bind('touchstart', function (event) {
            var target = event.target;
            if ($(target).hasClass('up bouvet_button')) {
                that.onTouchUpKeyPress(event);
            }
            else if ($(target).hasClass('down bouvet_button')) {
                that.onTouchDownKeyPress(event);
            }
        });
        $(document).bind('touchend', function (event) {
            var target = event.target;
            console.log(target);
            if ($(target).hasClass('up bouvet_button')) {
                that.onTouchUpKeyRelease(event);
            }
            else if ($(target).hasClass('down bouvet_button')) {
                that.onTouchDownKeyRelease(event);
            }
        });
    };
    GameComponent.prototype.onkeyDown = function (keyCode) {
        var keyStatus = this.keysPressed.get(keyCode);
        if (keyStatus === undefined || keyStatus === false) {
            this.keysPressed.set(keyCode, true);
            if (this.keyEventToId.get(keyCode) !== undefined && this.showCountDownTimer) {
                document.getElementById(this.keyEventToId.get(keyCode)).classList.toggle("arrow_keys_pressed", true);
            }
        }
    };
    GameComponent.prototype.onKeyUp = function (keyCode) {
        var keyStatus = this.keysPressed.get(keyCode);
        if (keyStatus === undefined || keyStatus === true) {
            this.keysPressed.set(keyCode, false);
            if (this.keyEventToId.get(keyCode) !== undefined && this.showCountDownTimer) {
                document.getElementById(this.keyEventToId.get(keyCode)).classList.toggle("arrow_keys_pressed", false);
            }
        }
    };
    GameComponent.prototype.handleAcceleration = function (actualFrameTime_milli) {
        var _this = this;
        this.keysPressed.forEach(function (item, key, mapObj) {
            if (item === true) {
                var keyPressed = _this.keyEventToId.get(key).trim();
                var car_speed_delta = 0;
                if (keyPressed === "w_key") {
                    car_speed_delta = _this.car_maxAcceleration * actualFrameTime_milli / 1000;
                }
                else if (keyPressed === "s_key") {
                    car_speed_delta = -_this.car_maxAcceleration * actualFrameTime_milli / 1000 * 1.5;
                }
                _this.car_speed += car_speed_delta;
            }
        });
        this.car_speed -= (this.car_speed * this.car_speed * this.car_resistance_square + this.car_speed * this.car_resistance_linear) * actualFrameTime_milli / 1000;
        this.car_speed = Math.max(0, this.car_speed);
        this.updateSpeedometer(this.car_speed);
    };
    GameComponent.prototype.GetSpeedLimit = function (p1, p2, p3, t) {
        var turnRadius = this.gameLogic.GetCurrentTurnRadius(p1, p2, p3, t);
        var speedLimit = Math.sqrt(turnRadius * this.car_grip);
        return speedLimit;
    };
    GameComponent.prototype.EnforcingSpeedLimit = function () {
        var _this = this;
        this.car_speed = 0;
        this.gameTime += 3000;
        this.showWoops = true;
        setTimeout(function () {
            _this.showWoops = false;
        }, 1000);
    };
    GameComponent.prototype.gameLoop = function () {
        if (this.setUpComplete) {
            var unixTimeNew = new Date().getTime();
            var actualFrameTime_milli = this.frameTime_milli;
            if (this.unixTimeOld > 0) {
                actualFrameTime_milli = unixTimeNew - this.unixTimeOld;
            }
            this.unixTimeOld = unixTimeNew;
            this.updatePan = false;
            if (unixTimeNew > this.lastPan + 10) {
                this.lastPan = unixTimeNew;
                this.updatePan = true;
            }
            this.gameTime += actualFrameTime_milli;
            var timeLeft = actualFrameTime_milli;
            var oTimeLeft = timeLeft;
            var carNewPosition = null;
            var carNewAngle = null;
            var safetyCounter = 0;
            for (var i = this.beizerCounter + 1; i < this.beizerCounter + this.speedLimit_lookahead; i++) {
                if (i > this.road.length - 3) {
                    break;
                }
                else if (this.road[i].type === 'b0') {
                    this.updateRoadSpeed(i, this.car_speed);
                }
            }
            while (timeLeft > 0 && Math.abs(this.car_speed) > 0 && safetyCounter < 100) {
                if (this.beizerCounter > this.road.length - 3) {
                    this.showGoal = true;
                    console.log("Goal!");
                    this.completionTime = (this.gameTime + (oTimeLeft - timeLeft));
                    this.setUpComplete = false;
                    break;
                }
                safetyCounter += 1;
                var pCurrent = this.road[this.beizerCounter];
                var pNext = this.road[this.beizerCounter + 1];
                var pNextNext = this.road[this.beizerCounter + 2];
                if ((pCurrent.type === 'p0' || pCurrent.type === 'b2') && (pNext.type === 'p0' || pNext.type === 'b0')) {
                    var lengthToTravel = this.car_speed * timeLeft * 0.001;
                    var distanceInBeizerTime = this.gameLogic.LineTime(pCurrent, pNext, lengthToTravel);
                    if (this.beizerTime + distanceInBeizerTime > 1) {
                        this.beizerCounter += 1;
                        this.removePiceFromRoad(this.beizerCounter);
                        distanceInBeizerTime = 1 - this.beizerTime;
                        this.beizerTime = 0;
                        timeLeft -= distanceInBeizerTime;
                    }
                    else {
                        timeLeft = 0;
                        this.beizerTime += distanceInBeizerTime;
                        carNewPosition = this.gameLogic.GetPostionByLineAndTime(pCurrent, pNext, this.beizerTime);
                        carNewAngle = this.gameLogic.GetAngleLine(pCurrent, pNext);
                        break;
                    }
                }
                else if (pCurrent.type === 'b0' && pNext.type === 'b1' && pNextNext.type === 'b2') {
                    var lengthToTravel = this.car_speed * timeLeft * 0.001;
                    var lengthOfTurn = this.gameLogic.BeizerCurveQudraticDistance_between(pCurrent, pNext, pNextNext, this.beizerTime, 1);
                    var lengthOfTotalTurn = this.gameLogic.BeizerCurveQudraticDistance_between(pCurrent, pNext, pNextNext, 0, 1);
                    var timeLeftOfTurn = lengthOfTurn / this.car_speed * 1000;
                    if (lengthOfTurn < lengthToTravel) {
                        var speedLimit = this.GetSpeedLimit(pCurrent, pNext, pNextNext, 0.5);
                        if (this.beizerTime < 0.5 && this.car_speed > speedLimit && this.car_speed > this.minimumSpeedLimit) {
                            this.EnforcingSpeedLimit();
                            break;
                        }
                        else {
                            this.beizerCounter += 2;
                            this.removePiceFromRoad(this.beizerCounter);
                            this.beizerTime = 0;
                            timeLeft -= timeLeftOfTurn;
                        }
                    }
                    else {
                        var firstGuessBeizerTime = this.beizerTime + lengthToTravel / lengthOfTotalTurn;
                        if (this.beizerTime < 0.5 && firstGuessBeizerTime > 0.5) {
                            var speedLimit = this.GetSpeedLimit(pCurrent, pNext, pNextNext, 0.5);
                            if (this.car_speed > speedLimit && this.car_speed > this.minimumSpeedLimit) {
                                this.EnforcingSpeedLimit();
                                break;
                            }
                        }
                        else {
                            var speedLimit = this.GetSpeedLimit(pCurrent, pNext, pNextNext, firstGuessBeizerTime);
                            if (this.car_speed > speedLimit && this.car_speed > this.minimumSpeedLimit) {
                                this.EnforcingSpeedLimit();
                                break;
                            }
                        }
                        this.beizerTime = firstGuessBeizerTime;
                        timeLeft = 0;
                        carNewPosition = this.gameLogic.BeizerCurveQuadratic(pCurrent, pNext, pNextNext, this.beizerTime);
                        carNewAngle = this.gameLogic.GetAngleBeizerCurve(pCurrent, pNext, pNextNext, this.beizerTime);
                        break;
                    }
                }
                if (safetyCounter === 100) {
                    console.log("ERROR: saftyCounter");
                    console.log("beizerTime: " + this.beizerTime);
                    console.log("pCurrent.type: " + pCurrent.type);
                    console.log("pNext.type: " + pNext.type);
                    console.log("pNextNext.type: " + pNextNext.type);
                }
            }
            this.handleAcceleration(actualFrameTime_milli);
            if (carNewPosition !== null) {
                this.MoveCar(carNewAngle);
                this.removeTempPolyline();
                this.tempPolyline = this.printRoadSection(this.beizerCounter, this.beizerTime, this.roadWidth);
                if (this.updatePan === true) {
                    var dN = this.car_speed * Math.cos(carNewAngle - Math.PI / 2) * 125 / 1000;
                    var dE = this.car_speed * Math.sin(carNewAngle - Math.PI / 2) * 125 / 1000;
                    var predictedCarPosition = this.gameLogic.CalcNewCoordinatesByReferenceAndDistance_c(carNewPosition, dN, dE);
                    this.map_game.setView(predictedCarPosition);
                }
            }
        }
        else {
            this.removeTempPolyline();
            console.log("setup is not complete :" + this.showCountDownTimer);
        }
    };
    GameComponent.prototype.removeTempPolyline = function () {
        if (this.tempPolyline !== null) {
            this.map_game.removeLayer(this.tempPolyline);
        }
    };
    GameComponent.prototype.rotateCar = function (image, angle) {
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
        context.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
        var newImage = new Image();
        newImage.src = canvas.toDataURL("image/png");
        return newImage;
    };
    GameComponent.prototype.rotateSpeedometer = function (image, angle) {
        var canvas = document.createElement("canvas");
        canvas.width = 190;
        canvas.height = 100;
        var needleCenter = 73;
        var context = canvas.getContext("2d");
        context.translate(canvas.width / 2, needleCenter);
        context.rotate(angle);
        context.translate(-canvas.width / 2, -needleCenter);
        context.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
        var newImage = new Image();
        newImage.src = canvas.toDataURL("image/png");
        return newImage;
    };
    GameComponent.prototype.updateSpeedometer = function (speed) {
        if (this.speedometer_needle_img_loaded) {
            var angle = Math.PI / 180 * (speed / this.speedometer_maxSpeed * 120 - 62);
            var img_r = this.rotateSpeedometer(this.speedometer_needle_img, angle);
            var speedometer_needle_img_tag = null;
            speedometer_needle_img_tag = $("#speedometer_needle");
            speedometer_needle_img_tag.attr("src", img_r.src);
        }
    };
    GameComponent.prototype.readCSVfile = function (csv) {
        var res = csv.split("\n");
        this.road = [];
        for (var i = 0; i < res.length; i++) {
            var res2 = res[i].split(",");
            if (res2.length > 2) {
                this.road[this.road.length] = {
                    'lat': res2[0].trim(),
                    'lon': res2[1].trim(),
                    'type': res2[3].trim()
                };
            }
        }
        this.printRoadToMap(this.road);
    };
    GameComponent.prototype.MoveCar = function (angle) {
        var _this = this;
        if (this.car_img_original !== null) {
            angle = angle - Math.PI / 2 + 0.035;
            angle = (((angle + 3 * Math.PI) % (2 * Math.PI)) - Math.PI);
            var img_r = this.rotateCar(this.car_img_original, angle);
            img_r.onload = (function () {
                _this.car_img_elem.attr("src", img_r.src);
            });
        }
        else {
            console.log("car image has not been loaded");
        }
    };
    GameComponent.prototype.printRoadToMap = function (road) {
        console.log("..print road to map: ");
        var roadSections_length = road.length;
        for (var i = 0; i < roadSections_length - 3; i++) {
            var polyline = this.printRoadSection(i, 0, this.roadWidth_inital);
            if (polyline !== null) {
                this.roadSections.set(i, polyline);
            }
        }
    };
    GameComponent.prototype.rePrintRoadToMap = function () {
        var _this = this;
        this.roadSections.forEach(function (item, key, mapObj) {
            item.addTo(_this.map_game);
            item.setStyle({ color: '#f37021' });
        });
    };
    GameComponent.prototype.setWidthOfRoad = function (roadWeight) {
        this.roadSections.forEach(function (item, key, mapObj) {
            item.setStyle({ weight: roadWeight });
        });
    };
    GameComponent.prototype.printRoadSection = function (beizerCounter, beizerTime, lineWeight) {
        var roadPoint_A = this.road[beizerCounter];
        var roadPoint_B = this.road[beizerCounter + 1];
        var roadPoint_C = this.road[beizerCounter + 2];
        if ((roadPoint_A.type === 'p0' || roadPoint_A.type === 'b2') && (roadPoint_B.type === 'p0' || roadPoint_B.type === 'b0')) {
            var p = this.gameLogic.GetPostionByLineAndTime(roadPoint_A, roadPoint_B, beizerTime);
            var pointA = L.latLng(p.lat, p.lon);
            var pointB = L.latLng(roadPoint_B.lat, roadPoint_B.lon);
            var pointList = [pointA, pointB];
            var polyline = null;
            polyline = L.polyline(pointList, {
                color: '#f37021',
                weight: lineWeight,
                opacity: 1,
                smoothFactor: 1
            });
            polyline.addTo(this.map_game);
            return polyline;
        }
        else if (roadPoint_A.type === 'b0') {
            var pointList_1 = [];
            var p1 = this.gameLogic.BeizerCurveQuadratic(roadPoint_A, roadPoint_B, roadPoint_C, beizerTime);
            pointList_1.push(L.latLng(p1.lat, p1.lon));
            var startTime = Math.ceil(beizerTime / 0.2 + 0.0001) * 0.2;
            for (var t = startTime; t <= 1; t += 0.2) {
                var p1 = this.gameLogic.BeizerCurveQuadratic(roadPoint_A, roadPoint_B, roadPoint_C, t);
                pointList_1.push(L.latLng(p1.lat, p1.lon));
            }
            var polyline = null;
            polyline = L.polyline(pointList_1, {
                color: '#f37021',
                weight: lineWeight,
                opacity: 1,
                smoothFactor: 1
            });
            polyline.addTo(this.map_game);
            return polyline;
        }
        else {
        }
        return null;
    };
    GameComponent.prototype.removePiceFromRoad = function (removePice) {
        var roadPice = this.roadSections.get(removePice);
        if (roadPice !== null && roadPice !== undefined) {
            this.map_game.removeLayer(roadPice);
        }
    };
    GameComponent.prototype.updateRoadSpeed = function (beizerNumber, speed) {
        var roadPice = this.roadSections.get(beizerNumber);
        if (roadPice !== null && roadPice !== undefined) {
            var pCurrent = this.road[beizerNumber];
            var pNext = this.road[beizerNumber + 1];
            var pNextNext = this.road[beizerNumber + 2];
            if (pCurrent.type === 'b0' && pNext.type === 'b1' && pNextNext.type === 'b2') {
                roadPice.setStyle({ color: 'red' });
                var speedLimit = this.GetSpeedLimit(pCurrent, pNext, pNextNext, 0.5);
                speedLimit = Math.max(speedLimit, this.minimumSpeedLimit);
                if (speed > speedLimit) {
                    roadPice.setStyle({ color: 'red', weight: (this.roadWidth + 2) });
                }
                else if (speed > speedLimit - 15) {
                    roadPice.setStyle({ color: '#ff4444', weight: (this.roadWidth + 1) });
                }
                else {
                    roadPice.setStyle({ color: '#f37021', weight: this.roadWidth });
                }
            }
        }
    };
    GameComponent.prototype.zoomToStartArea = function () {
        var _this = this;
        setTimeout(function () {
            _this.map_game.flyTo([59.93502, 10.75857], _this.zoomLevel, {
                animate: true,
                duration: 6
            });
        }, 1500);
        setTimeout(function () {
            _this.finishedZoomAnimation();
        }, 7500);
    };
    GameComponent.prototype.finishedZoomAnimation = function () {
        var _this = this;
        this.showCountDownTimer = true;
        this.zoomedToStartArea = true;
        this.setUpComplete = false;
        setTimeout(function () {
            console.log("load car..");
            _this.loadImageOfCar();
        }, 100);
        if (this.finishedFirstZoomAnimation == false) {
            this.setWidthOfRoad(this.roadWidth);
            var height_bouvetHuset = 220 * Math.pow(0.5, 18 - this.zoomLevel);
            var width_bouvetHuset = 207 * Math.pow(0.5, 18 - this.zoomLevel);
            var bouvetHuset_Icon = L.icon({
                iconUrl: '../app/img/map/BouvetHuset_Huset.png',
                iconSize: [height_bouvetHuset, width_bouvetHuset],
                iconAnchor: [height_bouvetHuset / 2, width_bouvetHuset / 2],
            });
            var height_goal = 65 * Math.pow(0.5, 18 - this.zoomLevel);
            var width_goal = 77 * Math.pow(0.5, 18 - this.zoomLevel);
            var goal_Icon = L.icon({
                iconUrl: '../app/img/map/BouvetHuset_Malstreken.png',
                iconSize: [height_goal, width_goal],
                iconAnchor: [height_goal / 2, width_goal / 2],
            });
            L.marker([59.930338, 10.711191], { icon: bouvetHuset_Icon }).addTo(this.map_game);
            L.marker([59.930811, 10.711663], { icon: goal_Icon }).addTo(this.map_game);
            this.finishedFirstZoomAnimation = true;
        }
    };
    GameComponent.prototype.loadImageOfCar = function () {
        var _this = this;
        this.car_img_elem = $("#car_img");
        this.car_img_original = new Image();
        this.car_img_original.onload = (function () {
            var img_r = _this.rotateCar(_this.car_img_original, Math.PI * 1.27 - Math.PI / 2);
            img_r.onload = (function () {
                _this.car_img_elem.attr("src", img_r.src);
                _this.car_img_elem.css("width", "20px");
                _this.car_img_elem.css("margin-top", "-21px");
                _this.car_img_elem.css("margin-left", "-11px");
            });
        });
        this.subscription = this.route.params.subscribe(function (param) {
            var userId = param['id'];
            _this.car_img_id = userId;
            _this.car_img_original.src = '../app/img/biler_small/bil_utenlykter_' + _this.car_img_id + '.png';
            console.log(userId);
        });
    };
    GameComponent.prototype.startGameFromCountdown = function (game) {
        console.log("Start from countdown");
        this.startGame(game);
    };
    GameComponent.prototype.restartGameFromButton = function () {
        var _this = this;
        console.log("Start from button");
        this.setUpComplete = false;
        this.zoomedToStartArea = false;
        this.MoveCar(Math.PI * 1.27);
        this.updateSpeedometer(0);
        this.showGoal = false;
        this.gameTime = 0;
        this.rePrintRoadToMap();
        if (this.zoomToStartAreaWhenRestarting) {
            this.map_game.flyTo([59.93502, 10.75857], this.zoomLevel, {
                animate: true,
                duration: 4
            });
            setTimeout(function () {
                _this.finishedZoomAnimation();
            }, 4000);
        }
        else {
            this.map_game.panTo([59.93502, 10.75857], { animate: false });
            this.finishedZoomAnimation();
        }
    };
    GameComponent.prototype.onTouchUpKeyRelease = function (event) {
        event.preventDefault();
        console.log(this.keyPressTimer);
        if (this.keyPressTimer) {
            clearInterval(this.keyPressTimer);
        }
        ;
        this.onKeyUp(38);
        return false;
    };
    GameComponent.prototype.onTouchUpKeyPress = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.keyPressTimer) {
            clearInterval(this.keyPressTimer);
        }
        ;
        this.keyPressTimer = setInterval(function () {
            _this.onkeyDown(38);
        }, 100);
        return false;
    };
    GameComponent.prototype.onTouchDownKeyRelease = function (event) {
        event.preventDefault();
        if (this.keyPressTimer) {
            clearInterval(this.keyPressTimer);
        }
        ;
        this.onKeyUp(40);
        return false;
    };
    GameComponent.prototype.onTouchDownKeyPress = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.keyPressTimer) {
            clearInterval(this.keyPressTimer);
        }
        ;
        this.keyPressTimer = setInterval(function () {
            _this.onkeyDown(40);
        }, 100);
        return false;
    };
    GameComponent.prototype.startGame = function (startGame) {
        console.log("from game: " + startGame);
        this.showCountDownTimer = false;
        this.setUpComplete = true;
        this.car_speed = 0;
        this.gameTime = 0;
        this.beizerCounter = 0;
        this.beizerTime = 0;
        this.unixTimeOld = 0;
        this.removePiceFromRoad(0);
        this.tempPolyline = this.printRoadSection(this.beizerCounter, this.beizerTime, this.roadWidth);
    };
    GameComponent.prototype.saveRecord = function (position) {
        var firstIndexed = (Number(position) + 1);
        var navigateTo = "toplist/" + firstIndexed.toString();
        this.router.navigateByUrl(navigateTo);
    };
    GameComponent.prototype.printId = function (id) {
        console.log(id);
    };
    GameComponent.prototype.ngOnDestroy = function () {
        console.log("DONE");
        if (this.subscription !== null) {
            this.subscription.unsubscribe();
        }
        this.setUpComplete = false;
        clearInterval(this.gameLoopInterval);
    };
    return GameComponent;
}());
GameComponent = __decorate([
    core_1.Component({
        selector: 'game-screen',
        templateUrl: 'app/game/game.component.html',
        styleUrls: [
            'app/game/game.component.css',
            'node_modules/leaflet/dist/leaflet.css'
        ]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router])
], GameComponent);
exports.GameComponent = GameComponent;
var GameLogic_helperClass = (function () {
    function GameLogic_helperClass() {
        this.timeStep = 0.02;
        this.earthCircumference_m = 40000000;
    }
    GameLogic_helperClass.prototype.TimeToString = function (time) {
        if (time === null || time < 0) {
            return "404, time not found";
        }
        var milliseconds_string = (Math.floor((time * 100 % 100))).toString();
        if (milliseconds_string.length === 1)
            milliseconds_string = "0" + milliseconds_string;
        var seconds_string = (Math.floor((time % 60))).toString();
        if (seconds_string.length === 1)
            seconds_string = "0" + seconds_string;
        var minute_string = (Math.floor((time / 60))).toString();
        if (minute_string.length === 1)
            minute_string = "0" + minute_string;
        return minute_string + "." + seconds_string + "." + milliseconds_string;
    };
    GameLogic_helperClass.prototype.GetCurrentTurnRadius = function (p1, p2, p3, t) {
        var totalLength = this.BeizerCurveQudraticDistance(p1, p2, p3);
        var dLength = 0.1;
        var tb = Math.max(0, t - (dLength / 2) / totalLength);
        var tf = Math.min(1, t + (dLength / 2) / totalLength);
        var angle_1 = this.GetAngleBeizerCurve(p1, p2, p3, tb);
        var angle_2 = this.GetAngleBeizerCurve(p1, p2, p3, tf);
        var deltaAngle = Math.abs(angle_2 - angle_1);
        if (deltaAngle < 0.0001) {
            return 1000000;
        }
        else {
            return dLength / deltaAngle;
        }
    };
    GameLogic_helperClass.prototype.BeizerCurveQuadratic = function (p1, p2, p3, t) {
        return {
            'lat': (Math.pow((1 - t), 2) * p1.lat + 2 * (1 - t) * t * p2.lat + p3.lat * Math.pow(t, 2)),
            'lon': (Math.pow((1 - t), 2) * p1.lon + 2 * (1 - t) * t * p2.lon + p3.lon * Math.pow(t, 2))
        };
    };
    GameLogic_helperClass.prototype.GetPostionByLineAndTime = function (p1, p2, t) {
        return {
            'lat': (1 - t) * p1.lat + t * p2.lat,
            'lon': (1 - t) * p1.lon + t * p2.lon
        };
    };
    GameLogic_helperClass.prototype.LineTime = function (p1, p2, l) {
        return l / this.GetDistanceBetweenCoordinates_m(p1, p2);
    };
    GameLogic_helperClass.prototype.LineDistance = function (p1, p2, tFrom, tTo) {
        return this.GetDistanceBetweenCoordinates_m(p1, p2) * (tTo - tFrom);
    };
    GameLogic_helperClass.prototype.BeizerCurveQudraticDistance = function (p1, p2, p3) {
        return this.BeizerCurveQudraticDistance_between(p1, p2, p3, 0, 1);
    };
    GameLogic_helperClass.prototype.BeizerCurveQudraticDistance_to = function (p1, p2, p3, tTo) {
        return this.BeizerCurveQudraticDistance_between(p1, p2, p3, 0, tTo);
    };
    GameLogic_helperClass.prototype.BeizerCurveQudraticDistance_between = function (pA, pB, pC, tFrom, tTo) {
        var sumDistance = 0;
        var p1 = this.BeizerCurveQuadratic(pA, pB, pC, tFrom);
        for (var t = tFrom + this.timeStep; t < tTo; t += this.timeStep) {
            var p2 = this.BeizerCurveQuadratic(pA, pB, pC, t);
            sumDistance += this.GetDistanceBetweenCoordinates_m(p1, p2);
            p1 = p2;
        }
        var p2 = this.BeizerCurveQuadratic(pA, pB, pC, tTo);
        sumDistance += this.GetDistanceBetweenCoordinates_m(p1, p2);
        return sumDistance;
    };
    GameLogic_helperClass.prototype.GetAngleBeizerCurve = function (p1, p2, p3, t) {
        var tb = Math.max(0, t - 0.001);
        var tf = Math.min(1, t + 0.001);
        var pb = this.BeizerCurveQuadratic(p1, p2, p3, tb);
        var pf = this.BeizerCurveQuadratic(p1, p2, p3, tf);
        return this.GetAngleLine(pb, pf);
    };
    GameLogic_helperClass.prototype.GetAngleLine = function (p1, p2) {
        var p1_m = this.CoordinatesToMeter(p1);
        var p2_m = this.CoordinatesToMeter(p2);
        var deltaLat_m = parseFloat(p1_m.lat_m) - parseFloat(p2_m.lat_m);
        var deltaLon_m = parseFloat(p2_m.lon_m) - parseFloat(p1_m.lon_m);
        var angle = this.GetAngle(deltaLon_m, deltaLat_m, -1, 0);
        var angle_deg = angle * 180 / Math.PI;
        return angle;
    };
    GameLogic_helperClass.prototype.CoordinatesToMeter = function (p) {
        var lat_m = p.lat * this.earthCircumference_m;
        var lon_m = p.lon * this.earthCircumference_m * Math.cos(Math.PI / 180 * p.lat);
        return {
            'lat_m': lat_m,
            'lon_m': lon_m
        };
    };
    GameLogic_helperClass.prototype.GetDistanceBetweenCoordinates_m = function (p1, p2) {
        var deltaLat = p1.lat - p2.lat;
        var deltaLon = p1.lon - p2.lon;
        var deltaLat_m = deltaLat * (this.earthCircumference_m / 360);
        var detlaLon_m = deltaLon * (this.earthCircumference_m / 360) * Math.cos(Math.PI / 180 * p1.lat);
        return Math.sqrt(Math.pow(deltaLat_m, 2) + Math.pow(detlaLon_m, 2));
    };
    GameLogic_helperClass.prototype.CalcNewCoordinatesByReferenceAndDistance_c = function (p1, dN_m, dE_m) {
        p1.lat += dN_m * (360 / this.earthCircumference_m);
        p1.lon += dE_m * (360 / this.earthCircumference_m) / Math.cos(Math.PI / 180 * p1.lat);
        return p1;
    };
    GameLogic_helperClass.prototype.GetAngle = function (ab_x, ab_y, bc_x, bc_y) {
        var ans = (Math.atan2(ab_y, ab_x) - Math.atan2(bc_y, bc_x));
        return (((ans + 3 * Math.PI) % (2 * Math.PI)) - Math.PI);
    };
    GameLogic_helperClass.prototype.initRoad = function () {
        return "59.93502,10.75857,0,p0\n\n                59.93475794822837,10.759000513850081,1,b0\n\n                59.93474,10.75903,2,b1\n\n                59.93472139899106,10.759057901546967,3,b2\n\n                59.93469860100894,10.75909209852016,4,b0\n\n                59.93468,10.75912,5,b1\n\n                59.934670642433645,10.759163668669833,6,b2\n\n                59.934659357566346,10.759216331383888,7,b0\n\n                59.93465,10.75926,8,b1\n\n                59.9346252860808,10.759242150968504,9,b2\n\n                59.934494713919186,10.759147848851782,10,b0\n\n                59.93447,10.759129999999999,11,b1\n\n                59.93444494368956,10.759116508093541,12,b2\n\n                59.93436505631043,10.759073491812465,13,b0\n\n                59.93434,10.759060000000002,14,b1\n\n                59.934316217647016,10.759068918395293,15,b2\n\n                59.93428378235298,10.759081081630562,16,b0\n\n                59.93426,10.75909,17,b1\n\n                59.934248575542526,10.75913112809401,18,b2\n\n                59.934221424457476,10.759228872000218,19,b0\n\n                59.93421,10.75927,20,b1\n\n                59.93420377088387,10.759316718390206,21,b2\n\n                59.93419622911612,10.7593732816483,22,b0\n\n                59.934189999999994,10.759419999999995,23,b1\n\n                59.934179022295616,10.759461715325001,24,b2\n\n                59.93415097770437,10.759568284771749,25,b0\n\n                59.93414,10.75961,26,b1\n\n                59.934115782806295,10.759616054306397,27,b2\n\n                59.93408421719371,10.759623945709542,28,b0\n\n                59.93406,10.759629999999998,29,b1\n\n                59.93403558125588,10.759609651023315,30,b2\n\n                59.93402441874412,10.759600348930185,31,b0\n\n                59.934,10.759580000000001,32,b1\n\n                59.93397613025751,10.759556130237684,33,b2\n\n                59.93397386974249,10.759553869722657,34,b0\n\n                59.93395,10.759530000000002,35,b1\n\n                59.933927295987,10.75950080907667,36,b2\n\n                59.93390270401301,10.759469190817814,37,b0\n\n                59.93388,10.759439999981256,38,b1\n\n                59.93385521750499,10.759422842666764,39,b2\n\n                59.93351478249501,10.75918715690699,40,b0\n\n                59.93348999999999,10.759169999999996,41,b1\n\n                59.933464881052615,10.759157820991925,42,b2\n\n                59.93318511894738,10.759022178759079,43,b0\n\n                59.93316,10.759010000000002,44,b1\n\n                59.9331350140823,10.75899535295485,45,b2\n\n                59.932894985917706,10.7588546467894,46,b0\n\n                59.93287,10.75884,47,b1\n\n                59.932845652489355,10.758819130674613,48,b2\n\n                59.93282434751065,10.758800869264295,49,b0\n\n                59.9328,10.75878,50,b1\n\n                59.93281441235608,10.758743414913175,51,b2\n\n                59.93291558764392,10.758486585336344,52,b0\n\n                59.93293,10.75845,53,b1\n\n                59.93294494803911,10.758414354796779,54,b2\n\n                59.93304505196088,10.75817564544486,55,b0\n\n                59.93305999999999,10.758139999999997,56,b1\n\n                59.93307319553926,10.758101428556994,57,b2\n\n                59.93317680446074,10.757798571709616,58,b0\n\n                59.93319,10.75776,59,b1\n\n                59.93320142431445,10.757718872515099,60,b2\n\n                59.93322857568556,10.757621127579112,61,b0\n\n                59.933240000000005,10.757579999999999,62,b1\n\n                59.93324963403563,10.757536646878897,63,b2\n\n                59.933270365964376,10.757443353199527,64,b0\n\n                59.93328,10.757400000000002,65,b1\n\n                59.93329056086038,10.757357756595484,66,b2\n\n                59.93330943913963,10.757282243478496,67,b0\n\n                59.93332,10.757240000000001,68,b1\n\n                59.93332804583861,10.757194943360277,69,b2\n\n                59.9333619541614,10.7570050567526,70,b0\n\n                59.93337,10.756959999999998,71,b1\n\n                59.9333779653123,10.756914863259972,72,b2\n\n                59.9333920346877,10.75683513679943,73,b0\n\n                59.93339999999999,10.756789999999999,74,b1\n\n                59.933407866766224,10.756744766137578,75,b2\n\n                59.93343213323377,10.756605233949237,76,b0\n\n                59.93344,10.756560000000002,77,b1\n\n                59.93344723683203,10.756514166761624,78,b2\n\n                59.93346276316797,10.756415833300752,79,b0\n\n                59.93347,10.75637,80,b1\n\n                59.93347622906492,10.756323282032271,81,b2\n\n                59.93348377093506,10.756266718006236,82,b0\n\n                59.93348999999999,10.756219999999995,83,b1\n\n                59.93349514297845,10.756172427556027,84,b2\n\n                59.933564857021544,10.755527572657437,85,b0\n\n                59.93357,10.755479999999999,86,b1\n\n                59.93357419454055,10.755431762806653,87,b2\n\n                59.933585805459465,10.755298237239103,88,b0\n\n                59.93359,10.755250000000002,89,b1\n\n                59.933595274928585,10.755202525692189,90,b2\n\n                59.93362472507142,10.754937474406617,91,b0\n\n                59.93363,10.75489,92,b1\n\n                59.933634028820414,10.75484165420716,93,b2\n\n                59.93366597117958,10.754458345897229,94,b0\n\n                59.93366999999999,10.754409999999995,95,b1\n\n                59.93367325483534,10.754361177479797,96,b2\n\n                59.93367674516466,10.754308822539986,97,b0\n\n                59.93368,10.75426,98,b1\n\n                59.93368662587323,10.754213618933752,99,b2\n\n                59.933713374126775,10.754026381158868,100,b0\n\n                59.93372,10.75398,101,b1\n\n                59.93372485898805,10.753932220029807,102,b2\n\n                59.93377514101195,10.753437780128182,103,b0\n\n                59.93378,10.75339,104,b1\n\n                59.9337839764443,10.753341620009001,105,b2\n\n                59.9338360235557,10.75270838015371,106,b0\n\n                59.93384,10.752660000000002,107,b1\n\n                59.93384642166848,10.752613442950295,108,b2\n\n                59.93387357833152,10.752416557143263,109,b0\n\n                59.93388,10.752369999999999,110,b1\n\n                59.93388478343436,10.75232216567823,111,b2\n\n                59.93389521656564,10.752217834365416,112,b0\n\n                59.9339,10.75217,113,b1\n\n                59.93390884617141,10.752125769170831,114,b2\n\n                59.93392115382858,10.75206423088497,115,b0\n\n                59.93393,10.752019999999998,116,b1\n\n                59.93393642169914,10.751973442728008,117,b2\n\n                59.93396357830086,10.751776557365554,118,b0\n\n                59.93397,10.75173,119,b1\n\n                59.93396804686763,10.751679218546029,120,b2\n\n                59.93396195313237,10.751520781429281,121,b0\n\n                59.93396,10.75147,122,b1\n\n                59.9339509327426,10.751420130037301,123,b2\n\n                59.9339290672574,10.751299869868767,124,b0\n\n                59.93392,10.751249999999999,125,b1\n\n                59.93389589757389,10.751227504311942,126,b2\n\n                59.933794102426106,10.751132495507344,127,b0\n\n                59.93377,10.75111,128,b1\n\n                59.9337516368316,10.751069600990041,129,b2\n\n                59.933738363168395,10.751040398930993,130,b0\n\n                59.93372,10.751,131,b1\n\n                59.93370628231942,10.750953359762748,132,b2\n\n                59.93363371768058,10.750706639990716,133,b0\n\n                59.93362,10.75066,134,b1\n\n                59.93360365632603,10.750616416730432,135,b2\n\n                59.93351634367397,10.750383582991606,136,b0\n\n                59.9335,10.750339999999998,137,b1\n\n                59.933479588260504,10.750303886799436,138,b2\n\n                59.933390411739495,10.750146112954598,139,b0\n\n                59.93337,10.75011,140,b1\n\n                59.933357080227765,10.750062627477064,141,b2\n\n                59.933352919772226,10.750047372473425,142,b0\n\n                59.93334,10.75,143,b1\n\n                59.933332250334956,10.749949627158452,144,b2\n\n                59.93332774966505,10.749920372804029,145,b0\n\n                59.93332,10.74987,146,b1\n\n                59.933316817038786,10.749819072610084,147,b2\n\n                59.93331318296121,10.749760927368907,148,b0\n\n                59.93331,10.749710000000002,149,b1\n\n                59.93331,10.749659701369854,150,b2\n\n                59.93331,10.749640298630146,151,b0\n\n                59.93331,10.74959,152,b1\n\n                59.93331,10.749539701369853,153,b2\n\n                59.93331,10.749510298630147,154,b0\n\n                59.93331,10.74946,155,b1\n\n                59.93328480465486,10.749452801318387,156,b2\n\n                59.933265195345136,10.749447198658467,157,b0\n\n                59.933240000000005,10.74944,158,b1\n\n                59.933214801833955,10.749432440530052,159,b2\n\n                59.93316519816605,10.74941755942968,160,b0\n\n                59.93314,10.74941,161,b1\n\n                59.93311480183362,10.749402440528266,162,b2\n\n                59.933065198166375,10.749387559424775,163,b0\n\n                59.93304,10.749379999993316,164,b1\n\n                59.933014800270925,10.74937160007618,165,b2\n\n                59.933005199729074,10.749368399896632,166,b0\n\n                59.93298,10.749359999999998,167,b1\n\n                59.93295542686713,10.749340887412032,168,b2\n\n                59.93273457313287,10.749169112285383,169,b0\n\n                59.93271,10.74915,170,b1\n\n                59.932690701119974,10.749111402203251,171,b2\n\n                59.932679298880025,10.74908859772336,172,b0\n\n                59.93266,10.74905,173,b1\n\n                59.932637793364734,10.749019027240553,174,b2\n\n                59.93230220663526,10.748550972065251,175,b0\n\n                59.93228,10.748520000000001,176,b1\n\n                59.93225844735043,10.74848695247149,177,b2\n\n                59.93215155264957,10.748323047263504,178,b0\n\n                59.93213000000001,10.748290000000004,179,b1\n\n                59.93210838370122,10.748257142991546,180,b2\n\n                59.93190161629879,10.747942856539845,181,b0\n\n                59.93188,10.747910000000001,182,b1\n\n                59.93185776656744,10.747879120079942,183,b2\n\n                59.931722233432566,10.747690879614831,184,b0\n\n                59.9317,10.747659999999998,185,b1\n\n                59.9316784020811,10.747627088691889,186,b2\n\n                59.9315115979189,10.74737291092094,187,b0\n\n                59.93149,10.74734,188,b1\n\n                59.93146800224227,10.74730833592887,189,b2\n\n                59.93085199775773,10.746421662807196,190,b0\n\n                59.93083,10.746389999999998,191,b1\n\n                59.930808448035606,10.746356953367378,192,b2\n\n                59.93055155196439,10.745963046058192,193,b0\n\n                59.93053,10.745929999999998,194,b1\n\n                59.930514313855426,10.745885555863206,195,b2\n\n                59.93048568614457,10.745804444015775,196,b0\n\n                59.93047,10.745759999999999,197,b1\n\n                59.93045957135036,10.74571083627667,198,b2\n\n                59.930410428649644,10.745479163544724,199,b0\n\n                59.9304,10.74543,200,b1\n\n                59.93038797629232,10.745381905069411,201,b2\n\n                59.93033202370768,10.745158094730803,202,b0\n\n                59.93032000000001,10.745110000000004,203,b1\n\n                59.930307216184104,10.745062517070462,204,b2\n\n                59.930192783815905,10.744637482560032,205,b0\n\n                59.93018,10.744590000000002,206,b1\n\n                59.93016846405316,10.74454154889241,207,b2\n\n                59.93009153594683,10.744218450845837,208,b0\n\n                59.93008,10.74417,209,b1\n\n                59.93006749278415,10.744122287108642,210,b2\n\n                59.92995750721585,10.74370271253018,211,b0\n\n                59.929945000000004,10.743654999996197,212,b1\n\n                59.92995797225861,10.743616083247144,213,b2\n\n                59.92996702774139,10.743588916799798,214,b0\n\n                59.92998,10.743550000000003,215,b1\n\n                59.92999978749165,10.743525265649856,216,b2\n\n                59.93000021250835,10.743524734378976,217,b0\n\n                59.93002,10.7435,218,b1\n\n                59.93004148249612,10.743480665851257,219,b2\n\n                59.930198517503875,10.743339334344283,220,b0\n\n                59.93022,10.743320000000002,221,b1\n\n                59.930241602228676,10.743301098123876,222,b2\n\n                59.93035839777132,10.74319890202406,223,b0\n\n                59.93038,10.743179999999999,224,b1\n\n                59.930401358006414,10.74316022420768,225,b2\n\n                59.930628641993586,10.7429497760714,226,b0\n\n                59.93065,10.74293,227,b1\n\n                59.93067165657796,10.74291129669656,228,b2\n\n                59.930848343422035,10.742758703513033,229,b0\n\n                59.93087,10.74274,230,b1\n\n                59.93089143905719,10.742720509996932,231,b2\n\n                59.9309585609428,10.74265949010092,232,b0\n\n                59.93097999999999,10.742639999999996,233,b1\n\n                59.93100134540309,10.742620179335303,234,b2\n\n                59.9310986545969,10.742529820798199,235,b0\n\n                59.93112,10.742509999999998,236,b1\n\n                59.93114286885265,10.742496278698615,237,b2\n\n                59.93114713114735,10.742493721321797,238,b0\n\n                59.93117,10.74248,239,b1\n\n                59.93119195815395,10.742462433490687,240,b2\n\n                59.93119804184606,10.742457566537002,241,b0\n\n                59.93122,10.74244,242,b1\n\n                59.93124160245636,10.742421097881897,243,b2\n\n                59.93127839754364,10.742388902180524,244,b0\n\n                59.9313,10.742370000000001,245,b1\n\n                59.93132160247527,10.74235109786535,246,b2\n\n                59.931358397524725,10.742318902197075,247,b0\n\n                59.93138,10.742300000000002,248,b1\n\n                59.93140132256588,10.742280099011218,249,b2\n\n                59.93150867743412,10.742179901134202,250,b0\n\n                59.93153,10.74216,251,b1\n\n                59.93155160254037,10.742141097851151,252,b2\n\n                59.93166839745964,10.74203890229679,253,b0\n\n                59.93169,10.74202,254,b1\n\n                59.931711800882645,10.742001832678804,255,b2\n\n                59.93184819911736,10.7418881674832,256,b0\n\n                59.93187,10.741869999999999,257,b1\n\n                59.93189168779571,10.74185141052292,258,b2\n\n                59.93198831220429,10.741768589601296,259,b0\n\n                59.93201,10.74175,260,b1\n\n                59.93203349585234,10.741739426915922,261,b2\n\n                59.93218650414766,10.741670573183027,262,b0\n\n                59.93221,10.741659999999998,263,b1\n\n                59.93223451209375,10.741679609658906,264,b2\n\n                59.93223548790625,10.741680390308906,265,b0\n\n                59.93226,10.7417,266,b1\n\n                59.93227127278343,10.741658666483739,267,b2\n\n                59.93227872721657,10.741631333562244,268,b0\n\n                59.932289999999995,10.74159,269,b1\n\n                59.932289999999995,10.741539702916574,270,b2\n\n                59.932289999999995,10.741350297083425,271,b0\n\n                59.932289999999995,10.7413,272,b1\n\n                59.932298169958926,10.741255065241784,273,b2\n\n                59.93230183004108,10.741234934789954,274,b0\n\n                59.93231,10.741190000000001,275,b1\n\n                59.93229628374824,10.74114336447791,276,b2\n\n                59.932123716251766,10.740556634989924,277,b0\n\n                59.93211,10.74051,278,b1\n\n                59.932098862994735,10.740461275499543,279,b2\n\n                59.932041137005264,10.740208724295636,280,b0\n\n                59.93203,10.74016,281,b1\n\n                59.932020823629394,10.740110185324465,282,b2\n\n                59.9319691763706,10.739829814491019,283,b0\n\n                59.93196,10.739780000000001,284,b1\n\n                59.93194838495928,10.739731603925499,285,b2\n\n                59.93191161504072,10.739578395931478,286,b0\n\n                59.9319,10.739530000000002,287,b1\n\n                59.93189010762535,10.739480538066278,288,b2\n\n                59.931859892374646,10.739329461812806,289,b0\n\n                59.93185,10.73928,290,b1\n\n                59.9318388844037,10.73923126220864,291,b2\n\n                59.93173111559629,10.738758737437687,292,b0\n\n                59.93172,10.73871,293,b1\n\n                59.93170996833104,10.73866061314147,294,b2\n\n                59.93160003166896,10.738119386497365,295,b0\n\n                59.93158999999999,10.738070000000004,296,b1\n\n                59.931579968402644,10.738020613493992,297,b2\n\n                59.93147003159735,10.737479386144837,298,b0\n\n                59.93146,10.737430000000002,299,b1\n\n                59.931449968474254,10.737380613846518,300,b2\n\n                59.93134003152575,10.736839385792322,301,b0\n\n                59.93133,10.73679,302,b1\n\n                59.93131846425493,10.736741549739826,303,b2\n\n                59.931241535745066,10.736418449998412,304,b0\n\n                59.93123,10.73637,305,b1\n\n                59.931219342300444,10.736320974523213,306,b2\n\n                59.93119065769955,10.73618902535912,307,b0\n\n                59.93118,10.73614,308,b1\n\n                59.931170934164136,10.736090137855772,309,b2\n\n                59.93114906583586,10.735969862050322,310,b0\n\n                59.93114,10.73592,311,b1\n\n                59.93116349652358,10.735909426669934,312,b2\n\n                59.931516503476416,10.735750573541162,313,b0\n\n                59.93154,10.735739999999998,314,b1\n\n                59.93156354589474,10.735729698708173,315,b2\n\n                59.931676454105265,10.73568030136607,316,b0\n\n                59.9317,10.73567,317,b1\n\n                59.93172257396543,10.735654950705312,318,b2\n\n                59.93173742603457,10.735645049325885,319,b0\n\n                59.93176,10.735630000000002,320,b1\n\n                59.93178100132801,10.735608998689342,321,b2\n\n                59.93178899867198,10.735601001345382,322,b0\n\n                59.93181,10.73558,323,b1\n\n                59.931827060331265,10.735548504107902,324,b2\n\n                59.93192293966873,10.735371496100274,325,b0\n\n                59.93194,10.735340000000003,326,b1\n\n                59.931957765840245,10.73531007873521,327,b2\n\n                59.93211223415976,10.73504992156551,328,b0\n\n                59.93213000000001,10.735020000000004,329,b1\n\n                59.93214791883356,10.734990434081594,330,b2\n\n                59.932312081166444,10.734719566232334,331,b0\n\n                59.93233,10.734689999999999,332,b1\n\n                59.93234938927995,10.7346641476571,333,b2\n\n                59.93237061072005,10.734635852403626,334,b0\n\n                59.93239,10.734609999999998,335,b1\n\n                59.93240860398861,10.734582094034423,336,b2\n\n                59.932411396011375,10.734577906000279,337,b0\n\n                59.93243,10.73455,338,b1\n\n                59.9324486040048,10.734522094010151,339,b2\n\n                59.932451395995194,10.734517906024552,340,b0\n\n                59.932469999999995,10.734489999999996,341,b1\n\n                59.93244480818837,10.734483129484856,342,b2\n\n                59.932385191811626,10.73446687047302,343,b0\n\n                59.93236,10.734460000000002,344,b1\n\n                59.93233512485701,10.734459999998164,345,b2\n\n                59.932314875142985,10.734459999998162,346,b0\n\n                59.932289999999995,10.73446,347,b1\n\n                59.93226546127728,10.734463505534796,348,b2\n\n                59.93224453872272,10.734466494471166,349,b0\n\n                59.93222000000001,10.734470000000002,350,b1\n\n                59.932194944742534,10.734456508602333,351,b2\n\n                59.93198505525747,10.734343491187301,352,b0\n\n                59.93196,10.734330000000002,353,b1\n\n                59.93193493798418,10.73431663346951,354,b2\n\n                59.931685062015816,10.734183366286384,355,b0\n\n                59.93166,10.734169999999999,356,b1\n\n                59.93163501071394,10.734155422813194,357,b2\n\n                59.931444989286064,10.734044576980263,358,b0\n\n                59.93142,10.734030000000002,359,b1\n\n                59.931394921142015,10.734016958896197,360,b2\n\n                59.93119507885799,10.733913040908504,361,b0\n\n                59.93117,10.7339,362,b1\n\n                59.93114489787024,10.733887448886927,363,b2\n\n                59.93105510212976,10.733842551016691,364,b0\n\n                59.93103,10.73383,365,b1\n\n                59.93100494115178,10.733816575503406,366,b2\n\n                59.930775058848226,10.733693424269363,367,b0\n\n                59.93075000000001,10.733680000000005,368,b1\n\n                59.93072491936295,10.733666995119174,369,b2\n\n                59.930505080637055,10.733553004668705,370,b0\n\n                59.930479999999996,10.733539999999998,371,b1\n\n                59.930454954318186,10.733526338580937,372,b2\n\n                59.93017504568181,10.733373661142918,373,b0\n\n                59.93015,10.73336,374,b1\n\n                59.93012497868999,10.733345925450331,375,b2\n\n                59.930015021310005,10.733284074424091,376,b0\n\n                59.92999,10.73327,377,b1\n\n                59.92996495433998,10.733256338642635,378,b2\n\n                59.929795045660015,10.733163661180832,379,b0\n\n                59.92977,10.73315,380,b1\n\n                59.92974492121279,10.733136958933011,381,b2\n\n                59.92954507878721,10.733033040871709,382,b0\n\n                59.92952,10.73302,383,b1\n\n                59.92949503836113,10.733005022979741,384,b2\n\n                59.929444961638865,10.732974976946378,385,b0\n\n                59.92942,10.732960000000002,386,b1\n\n                59.92939501084356,10.732945422946443,387,b2\n\n                59.92932498915644,10.732904576962294,388,b0\n\n                59.9293,10.732890000000001,389,b1\n\n                59.9292750231649,10.732875240866354,390,b2\n\n                59.9291049768351,10.732774758944196,391,b0\n\n                59.92907999999999,10.732759999999999,392,b1\n\n                59.92905500658264,10.732745487556828,393,b2\n\n                59.928794993417355,10.732594512170527,394,b0\n\n                59.92877,10.73258,395,b1\n\n                59.928744917900644,10.732567026385869,396,b2\n\n                59.928505082099356,10.732442973385204,397,b0\n\n                59.92848,10.732430000000003,398,b1\n\n                59.928454958486995,10.732416267427764,399,b2\n\n                59.92819504151301,10.732273732312997,400,b0\n\n                59.92817,10.73226,401,b1\n\n                59.92814491658555,10.732247053598705,402,b2\n\n                59.92788508341446,10.732112946155565,403,b0\n\n                59.92786,10.732100000000003,404,b1\n\n                59.92783489799711,10.732087448950372,405,b2\n\n                59.927745102002895,10.732042550953267,406,b0\n\n                59.92772000000001,10.732030000000004,407,b1\n\n                59.92769499227363,10.732015709849424,408,b2\n\n                59.92767500772638,10.732004290108142,409,b0\n\n                59.92765,10.731989999999998,410,b1\n\n                59.92762488099823,10.731977845528244,411,b2\n\n                59.92736511900177,10.731852154239629,412,b0\n\n                59.92734,10.73184,413,b1\n\n                59.92731499229434,10.731825709861262,414,b2\n\n                59.92729500770565,10.731814290096299,415,b0\n\n                59.92726999999999,10.731799999999998,416,b1\n\n                59.927265505559966,10.731749062995833,417,b2\n\n                59.92725949444002,10.7316809369687,418,b0\n\n                59.927254999999995,10.731629999996946,419,b1\n\n                59.92724510932329,10.731580546597428,420,b2\n\n                59.927244890676704,10.731579453364485,421,b0\n\n                59.927234999999996,10.731529999995436,422,b1\n\n                59.92722257882974,10.731482226187781,423,b2\n\n                59.92718242117025,10.731327773654089,424,b0\n\n                59.92717,10.731279999999998,425,b1\n\n                59.92715406867203,10.731235882321748,426,b2\n\n                59.92705593132796,10.730964117368938,427,b0\n\n                59.92704,10.73092,428,b1\n\n                59.927024316812606,10.730875564078085,429,b2\n\n                59.9268756831874,10.730454435473336,430,b0\n\n                59.92686,10.73041,431,b1\n\n                59.926844722377965,10.730365065604117,432,b2\n\n                59.92670527762204,10.72995493396906,433,b0\n\n                59.92669,10.72991,434,b1\n\n                59.92667467585436,10.729865121973132,435,b2\n\n                59.926565324145635,10.72954487768333,436,b0\n\n                59.92655,10.729499999999998,437,b1\n\n                59.926567114632576,10.729468623212975,438,b2\n\n                59.926592885367434,10.729421376865742,439,b0\n\n                59.92661,10.72939,440,b1\n\n                59.92662989871151,10.729365578994834,441,b2\n\n                59.92681010128849,10.72914442128673,442,b0\n\n                59.92683,10.72912,443,b1\n\n                59.9268510016522,10.729098998431024,444,b2\n\n                59.92696899834782,10.728981001735413,445,b0\n\n                59.92699,10.72896,446,b1\n\n                59.92701100168674,10.728938998354574,447,b2\n\n                59.92705899831326,10.728891001728051,448,b0\n\n                59.92708,10.72887,449,b1\n\n                59.92710219332546,10.728853355051426,450,b2\n\n                59.927177806674536,10.72879664503962,451,b0\n\n                59.927200000000006,10.728780000000006,452,b1\n\n                59.927222423446956,10.728764303620993,453,b2\n\n                59.927277576553045,10.72872569644673,454,b0\n\n                59.9273,10.728710000000001,455,b1\n\n                59.92732134698702,10.728690177864525,456,b2\n\n                59.92741865301298,10.728599822268986,457,b0\n\n                59.92744,10.728580000000001,458,b1\n\n                59.927462649413926,10.728565277953088,459,b2\n\n                59.92761735058607,10.728464722191193,460,b0\n\n                59.92764,10.72845,461,b1\n\n                59.92766299433632,10.728436860397856,462,b2\n\n                59.92768700566367,10.728423139641215,463,b0\n\n                59.92771,10.72841000000537,464,b1\n\n                59.92773144076542,10.72839050844832,465,b2\n\n                59.92779855923457,10.728329491654906,466,b0\n\n                59.92782,10.72831,467,b1\n\n                59.927839389403104,10.728284147492872,468,b2\n\n                59.92786061059689,10.728255852567843,469,b0\n\n                59.927879999999995,10.72823,470,b1\n\n                59.92789827487414,10.728201282383868,471,b2\n\n                59.92793172512586,10.728148717702586,472,b0\n\n                59.92795,10.728119999999999,473,b1\n\n                59.927967695828904,10.728089917250893,474,b2\n\n                59.92813230417109,10.727810083069182,475,b0\n\n                59.928149999999995,10.727779999999997,476,b1\n\n                59.92816875938753,10.727752486336444,477,b2\n\n                59.92828124061246,10.727587513873207,478,b0\n\n                59.9283,10.727560000000002,479,b1\n\n                59.92831893805069,10.727532945681942,480,b2\n\n                59.928351061949314,10.727487054398184,481,b0\n\n                59.92837,10.72746,482,b1\n\n                59.92838925951125,10.72743379488357,483,b2\n\n                59.928960740488755,10.726656206012532,484,b0\n\n                59.92898,10.72663,485,b1\n\n                59.92900003137173,10.726605962409252,486,b2\n\n                59.929059968628266,10.726534037701402,487,b0\n\n                59.92907999999999,10.726509999999996,488,b1\n\n                59.929099208593,10.726483657305982,489,b2\n\n                59.92976079140699,10.725576343732511,490,b0\n\n                59.929779999999994,10.725549999999993,491,b1\n\n                59.92980100254563,10.725528997483702,492,b2\n\n                59.92982899745436,10.72550100257497,493,b0\n\n                59.92985,10.725479999999997,494,b1\n\n                59.92987019319948,10.725456441294236,495,b2\n\n                59.92988980680053,10.725433558759685,496,b0\n\n                59.92991,10.72541,497,b1\n\n                59.929928519036416,10.72538187870585,498,b2\n\n                59.93016148096359,10.72502812170531,499,b0\n\n                59.93018,10.725,500,b1\n\n                59.9301990735279,10.72497329716226,501,b2\n\n                59.930310926472096,10.724816703040366,502,b0\n\n                59.93033,10.724790000000002,503,b1\n\n                59.93034966580099,10.724764909346238,504,b2\n\n                59.930600334199,10.724445091045334,505,b0\n\n                59.93062,10.72442,506,b1\n\n                59.93063974580002,10.724395135097994,507,b2\n\n                59.93087025419997,10.724104865261028,508,b0\n\n                59.93088999999999,10.72408,509,b1\n\n                59.93090998112757,10.724055812437674,510,b2\n\n                59.93106001887243,10.72387418779918,511,b0\n\n                59.93108,10.72385,512,b1\n\n                59.93106277489711,10.72380772008114,513,b2\n\n                59.930987225102896,10.723622279677143,574,b0\n                59.93097,10.723580000000002,575,b1\n                59.93095346667087,10.723536698165924,576,b2\n                59.93077653332913,10.72307330131853,577,b0\n                59.93076,10.72303,578,b1\n                59.93074253845256,10.722988092179513,579,b2\n                59.93067746154745,10.722831907607231,580,b0\n                59.930659999999996,10.72279,581,b1\n                59.930643731447915,10.722746331547933,582,b2\n                59.93048626855208,10.722323667985437,583,b0\n                59.93047,10.722280000000001,584,b1\n                59.93045316169951,10.722237138748545,585,b2\n                59.93037683830049,10.722042861005587,586,b0\n                59.93036,10.722000000000001,587,b1\n                59.930342731814406,10.721957788785042,588,b2\n                59.93028726818561,10.721822211025762,589,b0\n                59.93027,10.721779999999999,590,b1\n                59.930261182697066,10.721730035251179,591,b2\n                59.93024881730293,10.7216599646844,592,b0\n                59.93024,10.721610000000002,593,b1\n                59.93022366098864,10.721566429244538,594,b2\n                59.93019633901136,10.721493570638446,595,b0\n                59.93018,10.721450000000003,596,b1\n                59.93016377768378,10.721406269990547,597,b2\n                59.92996622231622,10.720873729434517,598,b0\n                59.92995,10.72083,599,b1\n                59.92993331209625,10.72078692137492,600,b2\n                59.92953668790374,10.719763077529127,601,b0\n                59.92952,10.719719999999999,602,b1\n                59.92950261199119,10.719677978845816,603,b2\n                59.92941738800881,10.719472020888404,604,b0\n                59.9294,10.71943,605,b1\n                59.92938431731735,10.719385565590104,606,b2\n                59.92929568268265,10.7191344341251,607,b0\n                59.92928,10.71909,608,b1\n                59.9292625394932,10.71904809454789,609,b2\n                59.929097460506796,10.718651904980534,610,b0\n                59.92907999999999,10.718609999999998,611,b1\n                59.92906360989942,10.718566502868697,612,b2\n                59.92883639010058,10.71796349647945,613,b0\n                59.92882,10.717919999999998,614,b1\n                59.92880205948554,10.7178788861904,615,b2\n                59.92871794051447,10.71768611354296,616,b0\n                59.928700000000006,10.717644999992304,617,b1\n                59.928683192974326,10.717602097619746,618,b2\n                59.92852680702569,10.717202901915106,619,b0\n                59.92851000000001,10.717160000000003,620,b1\n                59.928491744985216,10.71711943321059,621,b2\n                59.928438255014804,10.717000566609673,622,b0\n                59.92842000000001,10.716960000000002,623,b1\n                59.92843142601065,10.716918866469872,624,b2\n                59.92850857398936,10.716641133746473,625,b0\n                59.92852,10.7166,626,b1\n                59.92853088039021,10.716558152493464,627,b2\n                59.92863911960978,10.716141847802824,628,b0\n                59.92864999999999,10.716099999999997,629,b1\n                59.928661796139366,10.716059368947564,630,b2\n                59.92872820386063,10.715830631240989,631,b0\n                59.928740000000005,10.715790000000005,632,b1\n                59.92875605705594,10.715756426198666,633,b2\n                59.928778942944064,10.715708573893577,634,b0\n                59.928795,10.71567500001546,635,b1\n                59.92880627371938,10.715633663081936,636,b2\n                59.92882872628062,10.715551337016324,637,b0\n                59.92884,10.715509999999998,638,b1\n                59.928851661716024,10.715469184018994,639,b2\n                59.92885833828397,10.715445816032807,640,b0\n                59.928869999999996,10.715405000007372,641,b1\n                59.928880281503346,10.715362405238261,642,b2\n                59.92889471849665,10.715302594836233,643,b0\n                59.928905,10.715260000004479,644,b1\n                59.92891480860127,10.715216842176664,645,b2\n                59.92892019139873,10.715193157866858,646,b0\n                59.92893,10.71515,647,b1\n                59.92894127378496,10.715108662811469,648,b2\n                59.92894872621504,10.715081337234507,649,b0\n                59.92896,10.71504,650,b1\n                59.928972974487024,10.715001076565677,651,b2\n                59.92898202551297,10.714973923488802,652,b0\n                59.928995,10.71493500000373,653,b1\n                59.929009209576535,10.71489805517031,654,b2\n                59.92905579042346,10.714776944965989,655,b0\n                59.92907,10.714740000000003,656,b1\n                59.92908642175677,10.71470715659587,657,b2\n                59.92918357824323,10.714512843622932,658,b0\n                59.9292,10.71448,659,b1\n                59.92921757741027,10.714449639100561,660,b2\n                59.92929242258973,10.714320361063308,661,b0\n                59.92931,10.714289999999998,662,b1\n                59.92932736650409,10.714259165800676,663,b2\n                59.929537633495904,10.71388583462052,664,b0\n                59.929555,10.713855000010936,665,b1\n                59.92957307718868,10.713825798435343,666,b2\n                59.92960192281134,10.713779201655438,667,b0\n                59.92962000000001,10.713750000000001,668,b1\n                59.92963878566589,10.71372254432264,669,b2\n                59.929991214334116,10.713207456269078,670,b0\n                59.93001,10.71318,671,b1\n                59.9300275777568,10.713149638502012,672,b2\n                59.9301024222432,10.713020361661863,673,b0\n                59.93012,10.71299,674,b1\n                59.93013688192283,10.712958111991819,675,b2\n                59.93019311807717,10.712851888144726,676,b0\n                59.93021,10.71282,677,b1\n                59.930228606613355,10.712792090097327,678,b2\n                59.93023139338665,10.712787909937374,679,b0\n                59.93025,10.71276,680,b1\n                59.93026860662954,10.712732090073041,681,b2\n                59.93027139337046,10.712727909961659,682,b0\n                59.93029,10.7127,683,b1\n                59.93030665021697,10.712667624733086,684,b2\n                59.93045334978302,10.712382375576883,685,b0\n                59.93047,10.71235,686,b1\n                59.93048642238167,10.71231715537498,687,b2\n                59.93061357761833,10.71206284490165,688,b0\n                59.93063,10.71203,689,b1\n                59.930644897583505,10.711994245941911,690,b2\n                59.93076510241649,10.711705754342757,691,b0\n                59.93078,10.71167,692,b1\n                59.93079319910132,10.71163141814484,693,b2";
    };
    return GameLogic_helperClass;
}());
exports.GameLogic_helperClass = GameLogic_helperClass;
//# sourceMappingURL=game.component.js.map