/// <reference path="../../typings/leaflet/leaflet.d.ts" />
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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var GameComponent = (function () {
    function GameComponent(route, router) {
        this.route = route;
        this.router = router;
        this.showCountDownTimer = true;
    }
    GameComponent.prototype.ngOnInit = function () {
        //console.log(this.route.params.value.id);
        this.subscription = this.route.params.subscribe(function (param) {
            var userId = param['id'];
            console.log(userId);
        });
        var map_ = L.map('map_game', {
            center: L.latLng(59.93502, 10.758569999999999),
            zoom: 15,
            zoomControl: false
        });
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbHciLCJhIjoiY2l1dmw3aWttMDAwcjJ1cXc3bmZrMnExdCJ9.cxPXQumqqwNRhfWsj0Clvg', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(map_);
    };
    GameComponent.prototype.startGameFromCountdown = function (startGame) {
        console.log("from game: " + startGame);
        this.showCountDownTimer = false;
    };
    GameComponent.prototype.printId = function (id) {
        console.log(id);
    };
    GameComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    };
    GameComponent = __decorate([
        core_1.Component({
            selector: 'game-screen',
            templateUrl: 'app/game/game.component.html',
            styleUrls: [
                'app/game/game.component.css',
                'app/styles/shared.css'
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map