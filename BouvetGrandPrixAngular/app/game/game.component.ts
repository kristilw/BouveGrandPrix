﻿/// <reference path="../../typings/leaflet/leaflet.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

import { Component, OnInit, OnDestroy } from '@angular/core';

import { GoalComponent } from "./goal/goal.component";
import { CountdownComponent } from "./countdown/countdown.component";


import { Router, ActivatedRoute, Params } from '@angular/router';

import { Map } from 'leaflet';
import { LatLng } from 'leaflet';

declare var jQuery: any;

@Component({
    selector: 'game-screen',
    templateUrl: 'app/game/game.component.html',
    styleUrls: [
        'app/game/game.component.css',
        'app/styles/shared.css',
        'node_modules/leaflet/dist/leaflet.css'
    ]
})

export class GameComponent {
    private subscription: any;
    map_game: any;
    road: any;
    road_s: string;
    setUpComplete: boolean = false;
    frameTime_milli: number = 25;

    car_img_scale: number = 0.10;
    car_img: any = null;
    car_img_path: string = 'img/car';
    car_marker: any = null;

    car_resistance_square: number = 0.002;
    car_resistance_linear: number = 0.02;

    car_img_id: number= 0;

    car_speed: number = 0;
    car_maxAcceleration: number = 6;

    gameLoopInterval: any = null;

    speedometer_needle_img: any = null;
    speedometer_needle_img_loaded: boolean = false;
    speedometer_needle_img_path: string = 'img/needle';
    speedometer_needle_img_scale: number = 0.1;

    gameLogic: GameLogic_helperClass = new GameLogic_helperClass();

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    showCountDownTimer: boolean = false;
    showGoal: boolean = false;

    ngOnInit() {
        //console.log(this.route.params.value.id);

        

        this.map_game = L.map('map_game', {
            //center: L.latLng(59.93502, 10.75857),
            //zoom: 15,
            center: L.latLng(59.91902, 10.74857),
            zoom: 13,
            zoomControl: false,
            zoomAnimation: true,
            zoomAnimationThreshold: 20
        });

        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbHciLCJhIjoiY2l1dmw3aWttMDAwcjJ1cXc3bmZrMnExdCJ9.cxPXQumqqwNRhfWsj0Clvg', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            minZoom: 2, maxZoom: 20,
            zoomAnimation: true,
            zoomAnimationThreshold: 20

            // zoomTune: [13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15]

            //minZoom: 4, maxZoom: 10,
            //zoomTune: [4, 4, 4, 8, 8, 8, 8]
        }).addTo(this.map_game);

        this.zoomToStartArea();

        this.car_img = new Image();
        this.car_img.onload = (() => {
            var width = this.car_img.width * this.car_img_scale;
            var height = this.car_img.height * this.car_img_scale;

            var img_r = this.rotateImg(this.car_img, Math.PI * 1.27 - Math.PI / 2, this.car_img_path);
            img_r.onload = (() => {
                var carMarkerIcon = L.icon({
                    iconUrl: img_r.src,
                    iconSize: [width, height], // size of the icon
                    iconAnchor: [width / 2, height / 2], // point of the icon which will correspond to marker's location
                    popupAnchor: [width / 2, -height / 2] // point from which the popup should open relative to the iconAnchor
                });

                this.car_marker = L.marker([59.93502, 10.75857], { icon: carMarkerIcon }).addTo(this.map_game);
            });
        });

        this.subscription = this.route.params.subscribe(
            (param: any) => {
                let userId = param['id'];
                this.car_img_id = userId;
                this.car_img.src = '../app/img/biler/bil_utenlykter_' + this.car_img_id + '.png';
                console.log(userId);
            });

        this.speedometer_needle_img = new Image();
        this.speedometer_needle_img.onload = (() => {
            this.speedometer_needle_img_loaded = true;
            this.updateSpeedometer(0);
        });
        this.speedometer_needle_img.src = '../app/img/Speedometernål_stor.png';

        //this.car_img.src = '../app/img/car_w_1.png';
        

        /*$.ajax({
            url: "app/game/roads/road.csv",
            dataType: "text",  // jQuery will infer this, but you can set explicitly
            success: this.readCSVfile
        });*/

        //document.onkeydown = this.onkeyDown;
        document.onkeydown = ((e) => {
            var event: any = null;
            event = window.event ? window.event : e;
            this.onkeyDown(event.keyCode);
        });

        document.onkeyup = ((e) => {
            var event: any = null;
            event = window.event ? window.event : e;
            this.onKeyUp(event.keyCode);
        });

        this.keyEventToId.set(87, "w_key");
        this.keyEventToId.set(83, "s_key");

        this.readCSVfile(this.gameLogic.initRoad());
        this.gameLoopInterval = setInterval(() => { this.gameLoop(); }, this.frameTime_milli);
    }


    
    //document.onkeyup = onKeyUp;

    keysPressed: any = new Map();
    keyEventToId: any = new Map();

    onkeyDown(keyCode: number): void {     
        let keyStatus = this.keysPressed.get(keyCode);
        if (keyStatus === undefined || keyStatus === false) {
            this.keysPressed.set(keyCode, true);
            console.log("keyCode down: " + keyCode);
            if (this.keyEventToId.get(keyCode) !== undefined) {
                document.getElementById(this.keyEventToId.get(keyCode)).style.opacity = "1";
            }
        }
    }

    onKeyUp(keyCode: number): void {  
        let keyStatus = this.keysPressed.get(keyCode);
        if (keyStatus === undefined || keyStatus === true) {
            this.keysPressed.set(keyCode, false);
            console.log("keyCode up: " + keyCode);
            if (this.keyEventToId.get(keyCode) !== undefined) {
                document.getElementById(this.keyEventToId.get(keyCode)).style.opacity = "0.5";
            }
        }
    }

    
    handleAcceleration() {
        this.keysPressed.forEach((item, key, mapObj) => {
            if (item === true) {
                let keyPressed = this.keyEventToId.get(key).trim();
                //console.log("keyPressed: " + keyPressed);

                let car_speed_delta = 0;
                if (keyPressed === "w_key") {
                    car_speed_delta = this.car_maxAcceleration * this.frameTime_milli / 1000;
                     
                } else if (keyPressed === "s_key") {
                    car_speed_delta = -this.car_maxAcceleration * this.frameTime_milli / 1000 * 3;
                }
                this.car_speed += car_speed_delta;
            }
        });
        this.car_speed -= (this.car_speed * this.car_speed * this.car_resistance_square + this.car_speed * this.car_resistance_linear) * this.frameTime_milli / 1000;
        this.car_speed = Math.max(0, this.car_speed);
    }

    gameTime: number = 0;
    beizerCounter: number = 0;
    beizerTime: number = 0;

    lastPan: number = 0;
    updatePan: boolean = true;

    unixTimeOld: number = 0;
    completionTime: number = null;


    gameLoop(): void {
        if (this.setUpComplete) {
            var unixTimeNew = new Date().getTime();
            

            let actualFrameTime_milli = this.frameTime_milli;
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
            console.log("dt: " + actualFrameTime_milli +" gt: " + this.gameTime)

            /*var p = {
                'lat': 59.935,
                'lon': 10.7585
            }
            this.MoveCar(p, this.gameTime / 1000);*/


            var timeLeft = actualFrameTime_milli;
            var oTimeLeft = timeLeft;
            var carNewPosition = null;
            var carNewAngle = null;

            var safetyCounter = 0;

            //console.log("speed: " + this.car_speed);
            //

            while (timeLeft > 0 && Math.abs(this.car_speed) > 0 && safetyCounter < 100) {
                if (this.beizerCounter > this.road.length - 3) {
                    this.showGoal = true;
                    console.log("Goal!");
                    this.completionTime = (this.gameTime + (oTimeLeft - timeLeft)) / 1000;
                    this.setUpComplete = false;
                    break;
                }

                safetyCounter += 1;

                var pCurrent = this.road[this.beizerCounter];
                var pNext = this.road[this.beizerCounter + 1];
                var pNextNext = this.road[this.beizerCounter + 2];


                if ((pCurrent.type === 'p0' || pCurrent.type === 'b2') && (pNext.type === 'p0' || pNext.type === 'b0')) {
                    //console.log("line detected");

                    var lengthToTravel = this.car_speed * timeLeft * 0.001;
                    var distanceInBeizerTime = this.gameLogic.LineTime(pCurrent, pNext, lengthToTravel);

                    if (this.beizerTime + distanceInBeizerTime > 1) {
                        this.beizerCounter += 1;
                        distanceInBeizerTime = 1 - this.beizerTime;
                        this.beizerTime = 0;
                        timeLeft -= distanceInBeizerTime;
                    } else {
                        timeLeft = 0;
                        this.beizerTime += distanceInBeizerTime;

                        carNewPosition = this.gameLogic.GetPostionByLineAndTime(pCurrent, pNext, this.beizerTime);
                        carNewAngle = this.gameLogic.GetAngleLine(pCurrent, pNext);

                        //console.log(this.beizerTime);
                        break;
                    }
                } else if (pCurrent.type === 'b0' && pNext.type === 'b1' && pNextNext.type === 'b2') {
                    //console.log("curve detected");

                    var lengthToTravel = this.car_speed * timeLeft * 0.001;

                    var lengthOfTurn = this.gameLogic.BeizerCurveQudraticDistance_between(pCurrent, pNext, pNextNext, this.beizerTime, 1);
                    var lengthOfTotalTurn = this.gameLogic.BeizerCurveQudraticDistance_between(pCurrent, pNext, pNextNext, 0, 1);

                    var timeLeftOfTurn = lengthOfTurn / this.car_speed * 1000;

                    if (lengthOfTurn < lengthToTravel) {
                        this.beizerCounter += 2;
                        this.beizerTime = 0;
                        timeLeft -= timeLeftOfTurn;
                    } else {

                        var firstGuessBeizerTime = this.beizerTime + lengthToTravel / lengthOfTotalTurn;

                        this.beizerTime = firstGuessBeizerTime;
                        timeLeft = 0;

                        carNewPosition = this.gameLogic.BeizerCurveQuadratic(pCurrent, pNext, pNextNext, this.beizerTime);
                        carNewAngle = this.gameLogic.GetAngleBeizerCurve(pCurrent, pNext, pNextNext, this.beizerTime);

                        //console.log(this.beizerTime);
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

            this.handleAcceleration();

            if (carNewPosition !== null) {

                this.MoveCar(carNewPosition, carNewAngle);

                if (this.updatePan === true) {
                    //console.log("pan");
                    this.map_game.panTo(carNewPosition, {
                        animate: false
                    });
                }
                
            }
        } else {
            console.log("setup is not complete");
        }
    }

    rotateImg(image: any, angle: number, img_path: string): any {
        var canvas = document.createElement("canvas");
        var image_length = Math.sqrt(Math.pow(image.width, 2) + Math.pow(image.height, 2));

        var image_big = image.width > image.height ? image.width : image.height;
        var image_small = image.width < image.height ? image.width : image.height;

        var image_scaleFactor = image_big / image_small ;

        canvas.width = image.width * image_scaleFactor;
        canvas.height = image.height * image_scaleFactor;

        var context = canvas.getContext("2d");
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(angle);
        context.translate(-canvas.width / 2, -canvas.height / 2);
        context.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);

        var newImage = new Image();
        newImage.src = canvas.toDataURL(img_path);

        return newImage;
    }

    updateSpeedometer(speed: number): void {
        if (this.speedometer_needle_img_loaded) {
            let angle: number = speed - Math.PI/2;

            var img_r = this.rotateImg(this.speedometer_needle_img, angle, this.speedometer_needle_img_path);

            var speedometer_needle_img_tag: any = null;
            speedometer_needle_img_tag = $("#speedometer_needle");

            console.log(speedometer_needle_img_tag);

            speedometer_needle_img_tag.onload = (() => {
                console.log("needle updated");
            });

            speedometer_needle_img_tag.src = '../app/img/Speedometernål_stor.png';
        }
    }

    readCSVfile(csv: any): void {
        var res = csv.split("\n");

        this.road = [];
        for (let i = 0; i < res.length; i++) {
            var res2 = res[i].split(",");

            this.road[i] = {
                'lat': res2[0].trim(),
                'lon': res2[1].trim(),
                'type': res2[3].trim()
            }
        }

        this.printRoadToMap(this.road);
    }

    MoveCar(p: any, angle: number): void {
        if (this.car_img !== null && this.map_game !== null && this.car_marker != null) {
            this.car_marker.setLatLng([p.lat, p.lon]);

            var newCarMarker = null;
            var width = this.car_img.width * this.car_img_scale;
            var height = this.car_img.height * this.car_img_scale;

            angle = angle - Math.PI / 2 + 0.035;
            angle = (((angle + 3 * Math.PI) % (2 * Math.PI)) - Math.PI);

            var img_r = this.rotateImg(this.car_img, angle, this.car_img_path);
            img_r.onload = (() => {
                var carMarkerIcon = L.icon({
                    iconUrl: img_r.src,
                    iconSize: [width, height], // size of the icon
                    iconAnchor: [width / 2, height / 2], // point of the icon which will correspond to marker's location
                    popupAnchor: [width / 2, -height / 2] // point from which the popup should open relative to the iconAnchor
                });

                newCarMarker = L.marker(this.car_marker.getLatLng(), { icon: carMarkerIcon }).addTo(this.map_game);
                this.map_game.removeLayer(this.car_marker);
                this.car_marker = newCarMarker;
            });
        } else {
            console.log("car image has not been loaded");
        }
    }

    printRoadToMap(road: any): void {
        console.log("..print road to map: ");
        let roadSections_length = road.length;
        for (var i = 0; i < roadSections_length - 3; i++) {
            let roadPoint_A = road[i];
            let roadPoint_B = road[i + 1];
            let roadPoint_C = road[i + 2];

            if ((roadPoint_A.type === 'p0' || roadPoint_A.type === 'b2') && (roadPoint_B.type === 'p0' || roadPoint_B.type === 'b0')) {
                var pointA = L.latLng(roadPoint_A.lat, roadPoint_A.lon);
                var pointB = L.latLng(roadPoint_B.lat, roadPoint_B.lon);
                var pointList = [pointA, pointB];

                var firstpolyline = L.polyline(pointList, {
                    color: 'orange',
                    weight: 3,
                    opacity: 1,
                    smoothFactor: 1

                });
                firstpolyline.addTo(this.map_game);
            } else if (roadPoint_A.type === 'b0') {
                let pointList = [];
                for (var t = 0; t <= 1; t += 0.2) {
                    var p1 = this.gameLogic.BeizerCurveQuadratic(roadPoint_A, roadPoint_B, roadPoint_C, t);
                    pointList.push(L.latLng(p1.lat, p1.lon));
                }
                var firstpolyline = L.polyline(pointList, {
                    color: 'orange',
                    weight: 3,
                    opacity: 1,
                    smoothFactor: 1

                });
                firstpolyline.addTo(this.map_game);

                i += 1;
            } else {
                console.log("err! A: " + roadPoint_A.type + ", B: " + roadPoint_B.type + ", C: " + roadPoint_C.type)
            }
        }
    }

    zoomToStartArea(): void {
        setTimeout(() => {
            this.map_game.panTo([59.93502, 10.75857]);
        }, 1500);


        for (let i = 1; i < 7; i++) {
            setTimeout(() => {
                //map_game.setZoom(i + 13, '');
                this.map_game.flyTo([59.93502, 10.75857], (i + 13), { animate: true });
                //this.map_game.zoomIn();
                if (i === 6) {
                    this.showCountDownTimer = true;
                }
            }, 1500 * (i + 1));
        }
    }

    startGameFromCountdown(game: boolean): void {
        console.log("Start from countdown");
        this.startGame(game);
    }

    restartGameFromGoal(game: boolean): void {
        console.log("Start from goal");
        this.startGame(game);
    }

    startGame(startGame: boolean): void {
        console.log("from game: " + startGame);
        this.showCountDownTimer = false;
        this.setUpComplete = true;
    }

    printId(id: number): void {
        console.log(id)
    }

    ngOnDestroy() {
        console.log("DONE");
        this.subscription.unsubscribe();
        this.setUpComplete = false;
        clearInterval(this.gameLoopInterval);
        console.log("DONE");
    }
}

export class GameLogic_helperClass {

    public BeizerCurveQuadratic(p1, p2, p3, t): any {
        return {
            'lat': (Math.pow((1 - t), 2) * p1.lat + 2 * (1 - t) * t * p2.lat + p3.lat * Math.pow(t, 2)),
            'lon': (Math.pow((1 - t), 2) * p1.lon + 2 * (1 - t) * t * p2.lon + p3.lon * Math.pow(t, 2))
        };
    }

    public GetPostionByLineAndTime(p1, p2, t):any {
        return {
            'lat': (1 - t) * p1.lat + t * p2.lat,
            'lon': (1 - t) * p1.lon + t * p2.lon
        };
    }


    public LineTime(p1: any, p2: any, l: number): number {
        return l / this.GetDistanceBetweenCoordinates_m(p1, p2);
    }

    public LineDistance(p1: any, p2: any, tFrom: number, tTo: number): number {
        return this.GetDistanceBetweenCoordinates_m(p1, p2) * (tTo - tFrom);
    }

    timeStep: number = 0.02;
    public BeizerCurveQudraticDistance(p1: any, p2: any, p3: any): any {
        return this.BeizerCurveQudraticDistance_between(p1, p2, p3, 0, 1);
    }

    public BeizerCurveQudraticDistance_to(p1: any, p2: any, p3: any, tTo: number): any {
        return this.BeizerCurveQudraticDistance_between(p1, p2, p3, 0, tTo);
    }

    public BeizerCurveQudraticDistance_between(pA, pB, pC, tFrom, tTo):any {
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
    }


    public GetAngleBeizerCurve(p1:any, p2:any, p3:any, t:number):number {
        var tb = Math.max(0, t - 0.001);
        var tf = Math.min(1, t + 0.001);

        var pb = this.BeizerCurveQuadratic(p1, p2, p3, tb);
        var pf = this.BeizerCurveQuadratic(p1, p2, p3, tf);

        return this.GetAngleLine(pb, pf);
    }

    public GetAngleLine(p1:any, p2:any):number {
        var p1_m = this.CoordinatesToMeter(p1);
        var p2_m = this.CoordinatesToMeter(p2);

        var deltaLat_m = parseFloat(p1_m.lat_m) - parseFloat(p2_m.lat_m);
        var deltaLon_m = parseFloat(p2_m.lon_m) - parseFloat(p1_m.lon_m);

        var angle = this.GetAngle(deltaLon_m, deltaLat_m, -1, 0);

        var angle_deg = angle * 180 / Math.PI;
        return angle;
    }

    earthCircumference_m: number = 40000;

    public CoordinatesToMeter(p:any):any {
        var lat_m = p.lat * this.earthCircumference_m;
        var lon_m = p.lon * this.earthCircumference_m * Math.cos(Math.PI / 180 * p.lat);

        return {
            'lat_m': lat_m,
            'lon_m': lon_m
        }
    }

    public GetDistanceBetweenCoordinates_m(p1:any, p2:any):any {
        var deltaLat = p1.lat - p2.lat;
        var deltaLon = p1.lon - p2.lon;

        var deltaLat_m = deltaLat * this.earthCircumference_m;
        var detlaLon_m = deltaLon * this.earthCircumference_m * Math.cos(Math.PI / 180 * p1.lat);
        return Math.sqrt(Math.pow(deltaLat_m, 2) + Math.pow(detlaLon_m, 2));
    }

    public GetAngle(ab_x:number, ab_y:number, bc_x:number, bc_y:number):number {
        var ans = (Math.atan2(ab_y, ab_x) - Math.atan2(bc_y, bc_x));
        return (((ans + 3 * Math.PI) % (2 * Math.PI)) - Math.PI);
    }

    public initRoad(): string {
        return `59.93502,10.758569999999999,0,p0
                59.9347624353079,10.758993142270919,1,b0
                59.93474,10.759030000000001,2,b1
                59.93471674871557,10.759064876963876,3,b2
                59.93470325128442,10.759085123110609,4,b0
                59.93468,10.759119999999998,5,b1
                59.93466830303036,10.759174585888072,6,b2
                59.93466169696963,10.759205414171465,7,b0
                59.93465,10.75926,8,b1
                59.934619107570114,10.759237688692789,9,b2
                59.93450089242988,10.75915231109151,10,b0
                59.93447,10.75913,11,b1
                59.93443867958063,10.759113135103567,12,b2
                59.93437132041936,10.759076864785955,13,b0
                59.93433999999999,10.759060000000002,14,b1
                59.934310272029045,10.759071148003555,15,b2
                59.93428972797095,10.75907885202534,16,b0
                59.93426,10.759090000000002,17,b1
                59.93424571941388,10.759141410164561,18,b2
                59.93422428058612,10.759218589944496,19,b0
                59.93421,10.759270000000003,20,b1
                59.934202213597054,10.759328398043442,21,b2
                59.93419778640294,10.759361601999254,22,b0
                59.93419,10.75942,23,b1
                59.93417627785581,10.759472144204151,24,b2
                59.934153722144195,10.759557855908293,25,b0
                59.93414,10.75961,26,b1
                59.93410972847759,10.759617567889483,27,b2
                59.93409027152241,10.759622432128282,28,b0
                59.93406,10.75963,29,b1
                59.93402966293011,10.75960323194323,30,b2
                59.93400533706989,10.759581767943235,31,b0
                59.933975,10.759554999980127,32,b1
                59.93394620963014,10.75952014840742,33,b2
                59.933908790369856,10.759474851408571,34,b0
                59.93388,10.759439999981254,35,b1
                59.93384902185026,10.759418553321007,36,b2
                59.933520978149744,10.759191446159505,37,b0
                59.93349,10.759170000000001,38,b1
                59.93345860128438,10.759154776227888,39,b2
                59.93319139871562,10.759025223467278,40,b0
                59.93316,10.75901,41,b1
                59.93312880286401,10.758991182502768,42,b2
                59.93287619713599,10.758838817130107,43,b0
                59.932845,10.758819999983904,44,b1
                59.93285736343181,10.75876618281124,45,b2
                59.9329176365682,10.758503817405435,46,b0
                59.93293,10.75845,47,b1
                59.93294868506757,10.758405443446518,48,b2
                59.933041314932424,10.758184556845729,49,b0
                59.93306,10.75814,50,b1
                59.93307649444057,10.758091785643321,51,b2
                59.93317350555943,10.757808214680525,52,b0
                59.93319000000001,10.75776,53,b1
                59.933204280407345,10.757708590588111,54,b2
                59.93322571959266,10.757631409520942,55,b0
                59.93324,10.75758,56,b1
                59.933252042556575,10.75752580854054,57,b2
                59.93326795744343,10.757454191549712,58,b0
                59.93328,10.7574,59,b1
                59.93329320108867,10.757347195687396,60,b2
                59.933306798911325,10.757292804396766,61,b0
                59.93332,10.75724,62,b1
                59.93333005730831,10.757183679140645,63,b2
                59.933359942691695,10.757016320993689,64,b0
                59.93337,10.756959999999998,65,b1
                59.933379956650334,10.75690357901519,66,b2
                59.93339004334966,10.756846421052346,67,b0
                59.9334,10.75679,68,b1
                59.933409833467614,10.756733457612109,69,b2
                59.933430166532375,10.756616542489764,70,b0
                59.93343999999999,10.756559999999997,71,b1
                59.93344904604909,10.756502708391642,72,b2
                59.93346095395091,10.756427291680122,73,b0
                59.93347,10.75637,74,b1
                59.933477786338955,10.756311602479219,75,b2
                59.933482213661044,10.756278397563475,76,b0
                59.93349,10.75622,77,b1
                59.9334964287295,10.75616053438328,78,b2
                59.933563571270504,10.755539465878973,79,b0
                59.93357,10.755479999999999,80,b1
                59.933575243180925,10.755419703446124,81,b2
                59.93358475681908,10.755310296607272,82,b0
                59.93359,10.75525,83,b1
                59.933596593667325,10.755190657053545,84,b2
                59.93362340633268,10.754949343065269,85,b0
                59.93363,10.754890000000001,86,b1
                59.93363503603056,10.754829567696692,87,b2
                59.933664963969434,10.754470432430136,88,b0
                59.93367,10.75441,89,b1
                59.93367406854824,10.754348971787225,90,b2
                59.93367593145175,10.754321028234521,91,b0
                59.93368,10.75426,92,b1
                59.93368828234981,10.754202023606336,93,b2
                59.9337117176502,10.75403797650369,94,b0
                59.93372,10.75398,95,b1
                59.93372607374115,10.753920274975357,96,b2
                59.93377392625886,10.753449725217784,97,b0
                59.93378,10.753390000000001,98,b1
                59.933784970560346,10.753329524948974,99,b2
                59.93383502943965,10.752720475250804,100,b0
                59.93384,10.752660000000002,101,b1
                59.933848027093624,10.75260180362688,102,b2
                59.933871972906374,10.752428196484484,103,b0
                59.93388,10.752369999999999,104,b1
                59.93388597929893,10.752310207035855,105,b2
                59.933894020701075,10.752229793014424,106,b0
                59.9339,10.75217,107,b1
                59.933911057725325,10.752114711404603,108,b2
                59.93391894227467,10.752075288657856,109,b0
                59.933930000000004,10.75202,110,b1
                59.93393802713195,10.751961803349015,111,b2
                59.93396197286805,10.75178819676234,112,b0
                59.933969999999995,10.751729999999995,113,b1
                59.93398192579121,10.751675671521975,114,b2
                59.93404807420879,10.751374328730746,115,b0
                59.93406,10.75132,116,b1
                59.93407061940747,10.751264248159654,117,b2
                59.934089380592525,10.751165751938098,118,b0
                59.9341,10.75111,119,b1
                59.93411105784266,10.751054710850905,120,b2
                59.93413894215735,10.75091528927751,121,b0
                59.93415,10.75086,122,b1
                59.934163360867075,10.750807391815284,123,b2
                59.93429663913293,10.75028260864347,124,b0
                59.93431,10.75023,125,b1
                59.93432367411251,10.750177789901702,126,b2
                59.934406325887494,10.749862210397248,127,b0
                59.934419999999996,10.74981,128,b1
                59.93443320200717,10.749757192044791,129,b2
                59.93446679799282,10.749622808102202,130,b0
                59.93448000000001,10.749570000000002,131,b1
                59.934493299542105,10.749517313738961,132,b2
                59.9347267004579,10.748592687034076,133,b0
                59.93474,10.74854,134,b1
                59.93475178241604,10.748485506436536,135,b2
                59.93480821758396,10.748224493785004,136,b0
                59.93482,10.748169999999998,137,b1
                59.934830480767566,10.74811410260558,138,b2
                59.93483951923244,10.748065897459545,139,b0
                59.934850000000004,10.748010000000003,140,b1
                59.93486169771053,10.747955410713967,141,b2
                59.93486830228947,10.747924589345581,142,b0
                59.93488,10.747870000000002,143,b1
                59.934888648612635,10.747812342619238,144,b2
                59.93490135138737,10.74772765745439,145,b0
                59.93491000000001,10.747670000000003,146,b1
                59.93491864862632,10.747612342528013,147,b2
                59.93493135137368,10.747527657545616,148,b0
                59.93494,10.747470000000002,149,b1
                59.934946594067,10.747410653420847,150,b2
                59.934953405933,10.747349346626839,151,b0
                59.93496,10.74729,152,b1
                59.934965137844614,10.747229630388915,153,b2
                59.934994862155385,10.746880369737413,154,b0
                59.935,10.746819999999998,155,b1
                59.93500466695667,10.746759329572962,156,b2
                59.93500533304333,10.746750670446463,157,b0
                59.93501,10.74669,158,b1
                59.935012935793004,10.746628348360002,159,b2
                59.935017064206995,10.746541651666194,160,b0
                59.93502,10.746480000000002,161,b1
                59.93502255026525,10.74641815613727,162,b2
                59.93505744973474,10.745571844002075,163,b0
                59.93506,10.745509999999998,164,b1
                59.93506318227982,10.745448476028681,165,b2
                59.93511681772018,10.744411524181528,166,b0
                59.93512,10.74435,167,b1
                59.93512,10.74428712321826,168,b2
                59.93512,10.744232876781739,169,b0
                59.93512,10.744169999999999,170,b1
                59.935125243557465,10.744109699115754,171,b2
                59.93513475644252,10.744000300937648,172,b0
                59.93514,10.743940000000002,173,b1
                59.935143236609235,10.743878504437015,174,b2
                59.93514676339076,10.743811495587995,175,b0
                59.93515,10.743749999999999,176,b1
                59.93515637607687,10.743690490151959,177,b2
                59.935263623923134,10.742689510253424,178,b0
                59.93527,10.742629999999998,179,b1
                59.9352766877547,10.742570722553204,180,b2
                59.9354833122453,10.740739278204641,181,b0
                59.93549,10.74068,182,b1
                59.9354964011911,10.740620507474913,183,b2
                59.93599359880889,10.735999494321286,184,b0
                59.936,10.735940000000001,185,b1
                59.93600734586047,10.735881233138494,186,b2
                59.936012654139525,10.735838766906046,187,b0
                59.93602,10.73578,188,b1
                59.93602648366794,10.735720566686345,189,b2
                59.93619351633206,10.73418943393188,190,b0
                59.93620000000001,10.734130000000006,191,b1
                59.936204069004475,10.734068964943843,192,b2
                59.936205930995534,10.734041035077913,193,b0
                59.93621,10.73398,194,b1
                59.93621,10.733917121151755,195,b2
                59.93621,10.733872878848246,196,b0
                59.93621,10.733809999999998,197,b1
                59.93621,10.733747121151753,198,b2
                59.93621,10.733687878848247,199,b0
                59.93621,10.733625,200,b1
                59.93621,10.733562121151754,201,b2
                59.93621,10.733502878848249,202,b0
                59.93621,10.73344,203,b1
                59.93620533938095,10.733376304850344,204,b2
                59.93619966061906,10.73329869510146,205,b0
                59.936195000000005,10.73323499999167,206,b1
                59.936189210787994,10.733171318645066,207,b2
                59.936185789212004,10.733133681311056,208,b0
                59.93617999999999,10.733069999999996,209,b1
                59.93617007054892,10.733007113438132,210,b2
                59.93615992945107,10.732942886485096,211,b0
                59.93615,10.73288,212,b1
                59.93613955005857,10.732817300314103,213,b2
                59.93613044994143,10.732762699611309,214,b0
                59.93612,10.732700000000001,215,b1
                59.93610631359715,10.732638937490384,216,b2
                59.93606868640285,10.732471062312296,217,b0
                59.936055,10.732409999993934,218,b1
                59.93603823930089,10.732351337464209,219,b2
                59.93601176069911,10.732258662349816,220,b0
                59.935995,10.732199999975432,221,b1
                59.935975950399964,10.732143758155154,222,b2
                59.935909049600035,10.731946241523412,223,b0
                59.93589,10.731889999999998,224,b1
                59.93586967720406,10.731835382251223,225,b2
                59.93575032279594,10.731514617279444,226,b0
                59.93572999999999,10.73146,227,b1
                59.93571089904483,10.731403820459777,228,b2
                59.935579100955174,10.731016179019582,229,b0
                59.93556,10.730959999999998,230,b1
                59.93554062503465,10.730904154253237,231,b2
                59.93540937496535,10.730525845229971,232,b0
                59.93539,10.73047,233,b1
                59.935369084440474,10.730416216819563,234,b2
                59.93520091555953,10.72998378255426,235,b0
                59.93518,10.72993,236,b1
                59.935159740383334,10.729875298900843,237,b2
                59.93510025961666,10.72971470083085,238,b0
                59.93508,10.729660000000003,239,b1
                59.93505633413798,10.72961084746566,240,b2
                59.93484366586202,10.729169151815574,241,b0
                59.93482,10.72912,242,b1
                59.934796719537374,10.729070113222319,243,b2
                59.93477328046263,10.729019886633584,244,b0
                59.93475,10.728970000000002,245,b1
                59.9347267833535,10.728919994750175,246,b2
                59.934643216646506,10.728740004919736,247,b0
                59.93462,10.728690000000002,248,b1
                59.93459587935402,10.728641758549854,249,b2
                59.934514120645986,10.728478241133804,250,b0
                59.93449,10.72843,251,b1
                59.93446655990874,10.728380414828298,252,b2
                59.934253440091254,10.727929584440073,253,b0
                59.93423,10.7278799999938,254,b1
                59.93420661611805,10.727830309159472,255,b2
                59.93417338388196,10.727759690660362,256,b0
                59.93415,10.727709999999998,257,b1
                59.934126664698184,10.727660217937517,258,b2
                59.93409833530183,10.727599781884996,259,b0
                59.934075,10.727549999981546,260,b1
                59.93405581647893,10.727493925000342,261,b2
                59.934029183521076,10.727416074823406,262,b0
                59.93401000000001,10.72736,263,b1
                59.933987574245315,10.727308593041174,264,b2
                59.933869925754685,10.727038906466474,265,b0
                59.93384749999999,10.726987499952118,266,b1
                59.93382231885136,10.72694158125056,267,b2
                59.93374518114864,10.726800918409833,268,b0
                59.93372,10.726755,269,b1
                59.93369265216944,10.726714954821349,270,b2
                59.933607347830566,10.726590044896579,271,b0
                59.933580000000006,10.726550000000005,272,b1
                59.93355365427389,10.726507014768396,273,b2
                59.93351134572611,10.726437985020352,274,b0
                59.93348499999999,10.726394999972596,275,b1
                59.93345967641657,10.72634941746135,276,b2
                59.93343532358343,10.7263055823706,277,b0
                59.93341,10.72626,278,b1
                59.933385214278374,10.726213182431128,279,b2
                59.93334478572163,10.726136817379492,280,b0
                59.93332,10.726090000000001,281,b1
                59.93329588045607,10.726041760171428,282,b2
                59.93282411954393,10.725098238347135,283,b0
                59.9328,10.725049999999998,284,b1
                59.93277610899027,10.725001298739661,285,b2
                59.932563891009735,10.724568700548572,286,b0
                59.93254,10.72452,287,b1
                59.93251651316458,10.724470509700534,288,b2
                59.932423486835425,10.724274489921086,289,b0
                59.9324,10.724224999978244,290,b1
                59.93237633606381,10.724175851747598,291,b2
                59.932358663936185,10.724139148103404,292,b0
                59.932335,10.724089999998455,293,b1
                59.93231190127103,10.724039784870893,294,b2
                59.932013098728966,10.723390214128647,295,b0
                59.93199,10.72334,296,b1
                59.931968228484564,10.723287524785002,297,b2
                59.93181677151543,10.72292247465305,298,b0
                59.931795,10.722869999998455,299,b1
                59.931773887777304,10.722816515612639,300,b2
                59.9317411122227,10.72273348420833,301,b0
                59.93171999999999,10.72268,302,b1
                59.93169900438483,10.722626344425032,303,b2
                59.93165099561517,10.722503655347001,304,b0
                59.93163,10.722449999999998,305,b1
                59.93160832827202,10.72239736858224,306,b2
                59.93158167172797,10.722332631260972,307,b0
                59.93156,10.72228,308,b1
                59.93153877345725,10.72222668650442,309,b2
                59.93136622654274,10.721793312856217,310,b0
                59.931345,10.721739999996947,311,b1
                59.931324266707165,10.721685967539779,312,b2
                59.931200733292826,10.72136403197742,313,b0
                59.93118,10.721310000000003,314,b1
                59.93115817317386,10.721257615410295,315,b2
                59.931051826826135,10.721002384175753,316,b0
                59.93103,10.72095,317,b1
                59.931008867762245,10.720896547760068,318,b2
                59.93096613223774,10.720788452013492,319,b0
                59.930944999999994,10.720734999983806,320,b1
                59.930926171164195,10.720678513437807,321,b2
                59.9309188288358,10.720656486455258,322,b0
                59.930899999999994,10.720600000000001,323,b1
                59.930879041345726,10.720546293218563,324,b2
                59.93076095865427,10.720243706321698,325,b0
                59.93074,10.720190000000002,326,b1
                59.93071837739225,10.720137294668879,327,b2
                59.930601622607746,10.719852704881639,328,b0
                59.93058,10.7198,329,b1
                59.93056012776383,10.719744799225014,330,b2
                59.930509872236165,10.719605200537043,331,b0
                59.930490000000006,10.719550000000003,332,b1
                59.93046823793385,10.71949751477714,333,b2
                59.93034176206615,10.719192484743257,334,b0
                59.93032,10.71914,335,b1
                59.930299837525794,10.719085183036603,336,b2
                59.93018016247421,10.71875981648434,337,b0
                59.930159999999994,10.718704999992301,338,b1
                59.93013811320116,10.718652714753828,339,b2
                59.930091886798834,10.718542285018893,340,b0
                59.93007,10.71849,341,b1
                59.93004938329788,10.718435806976661,342,b2
                59.929740616702134,10.717624191924994,343,b0
                59.92972,10.717569999999998,344,b1
                59.92969917603585,10.717516102433557,345,b2
                59.929570823964156,10.717183897071559,346,b0
                59.92954999999999,10.717129999999997,347,b1
                59.929529456503516,10.717075706274077,348,b2
                59.92943054349647,10.716814293326898,349,b0
                59.92941,10.71676,350,b1
                59.929392594116294,10.716701980311962,351,b2
                59.929367405883696,10.716618019536625,352,b0
                59.92935,10.71656,353,b1
                59.92933763694352,10.716498184661777,354,b2
                59.929322363056485,10.7164218152219,355,b0
                59.92931,10.716359999987779,356,b1
                59.92929345190121,10.716301162249678,357,b2
                59.92928154809879,10.716258837617195,358,b0
                59.929265,10.716199999981544,359,b1
                59.9292461725009,10.716143517416286,360,b2
                59.9292288274991,10.716091482406057,361,b0
                59.92921,10.716034999966192,362,b1
                59.929190974561074,10.715978750580778,363,b2
                59.929056525438924,10.715581248852004,364,b0
                59.9290375,10.715524999996578,365,b1
                59.92902666186162,10.715462472228362,366,b2
                59.92901583813838,10.715400027665622,367,b0
                59.929005,10.715337499979821,368,b1
                59.928996560943546,10.715274207031438,369,b2
                59.928988439056454,10.715213292884737,370,b0
                59.92898,10.71515,371,b1
                59.92898503584096,10.71508956993563,372,b2
                59.92899496415904,10.714970430118642,373,b0
                59.929,10.714910000000001,374,b1
                59.9290184946118,10.71486508458238,375,b2
                59.9290515053882,10.714784915553981,376,b0
                59.92907,10.71474,377,b1
                59.92909052721649,10.71469894569884,378,b2
                59.92917947278352,10.714521054564777,379,b0
                59.92920000000001,10.71448,380,b1
                59.929221971784806,10.714442048832883,381,b2
                59.9292880282152,10.714327951362216,382,b0
                59.92931,10.71429,383,b1
                59.92933170815182,10.714251457207407,384,b2
                59.92953329184818,10.713893543306565,385,b0
                59.929555,10.713855000010934,386,b1
                59.92957759650844,10.713818498000133,387,b2
                59.92959740349156,10.71378650210099,388,b0
                59.92962,10.713750000000001,389,b1
                59.92964348210584,10.7137156803643,390,b2
                59.929986517894164,10.713214320365987,391,b0
                59.93001,10.71318,392,b1
                59.930031972217975,10.71314204808469,393,b2
                59.93009802778204,10.713027952110416,394,b0
                59.93012000000001,10.71299,395,b1
                59.93014147813156,10.712950948956227,396,b2
                59.93020852186844,10.71282905126342,397,b0
                59.93023,10.71279000001744,398,b1
                59.93025325830344,10.712755112592765,399,b2
                59.93026674169656,10.712734887499163,400,b0
                59.93029,10.712699999999998,401,b1
                59.93031081279203,10.712659530870958,402,b2
                59.93044918720797,10.712390469506637,403,b0
                59.93047000000001,10.712350000000006,404,b1
                59.93049052799762,10.712308944172726,405,b2
                59.93060947200239,10.712071056163174,406,b0
                59.93063,10.712029999999999,407,b1
                59.93064862199801,10.711985307377795,408,b2
                59.93076137800199,10.711714692968235,409,b0
                59.93078,10.71167,410,b1
                59.93079649889316,10.711621772628117,411,b2
                59.930893501106844,10.711338227695808,412,b0
                59.93091,10.71129,413,b1
                59.93092488325371,10.711239397065164,414,b2
                59.93099511674629,10.711000603190394,415,b0
                59.93101,10.710950000000002,416,b1
                59.9310226835525,10.710896548088424,417,b2
                59.9311373164475,10.710413452316624,418,b0
                59.93115,10.71036,419,b1
                59.93116241021348,10.710306222484466,420,b2
                59.93119758978652,10.710153777667921,421,b0
                59.93121,10.710099999999999,422,b1
                59.93122153277629,10.710045219359058,423,b2
                59.93123846722369,10.70996478073389,424,b0
                59.93124999999999,10.709909999999997,425,b1
                59.931262796118595,10.709856683009248,426,b2
                59.93135720388141,10.709463317330899,427,b0
                59.93137000000001,10.709410000000005,428,b1
                59.93138241034978,10.709356221941889,429,b2`;
    }
}