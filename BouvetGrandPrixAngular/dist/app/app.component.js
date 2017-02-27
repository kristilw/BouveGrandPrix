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
var toplist_service_1 = require("./services/toplist.service");
var AppComponent = (function () {
    function AppComponent(toplistService) {
        this.toplistService = toplistService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var map_ = L.map('map', {
            center: L.latLng(59.931, 10.720),
            zoom: 13,
            zoomControl: false,
            attributionControl: false
        });
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbHciLCJhIjoiY2l1dmw3aWttMDAwcjJ1cXc3bmZrMnExdCJ9.cxPXQumqqwNRhfWsj0Clvg', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(map_);
        L.control.attribution({ position: 'topright' }).addTo(map_);
        $('#menu_modal').on('show.bs.modal', function () {
            var elem = document.getElementById("router_outlet_div");
            elem.style.opacity = "0";
            var modal_btn = document.getElementById("menu_btn");
            modal_btn.classList.toggle("menu-hamburger-remove", true);
            modal_btn.classList.toggle("menu-hamburger", false);
        });
        $('#menu_modal').on('hide.bs.modal', function () {
            var elem = document.getElementById("router_outlet_div");
            elem.style.opacity = "1";
            var modal_btn = document.getElementById("menu_btn");
            modal_btn.classList.toggle("menu-hamburger-remove", false);
            modal_btn.classList.toggle("menu-hamburger", true);
        });
        this.getToplist();
    };
    AppComponent.prototype.twitterShare = function (event) {
        event.preventDefault();
        var currentTarget = event.currentTarget;
        var strTitle = ((typeof currentTarget.getAttribute('title') !== 'undefined') ? currentTarget.getAttribute('title') : 'Social Share'), strParam = 'width=' + 500 + ',height=' + 400 + ',resizable=' + 'no', objWindow = window.open(currentTarget.getAttribute('href'), strTitle, strParam).focus();
    };
    AppComponent.prototype.fbShare = function (event) {
        event.preventDefault();
        FB.ui({
            display: 'popup',
            method: 'share',
            caption: 'Bouvet',
            description: 'Vi har flyttet! Spill Bouvet Grand Prix, og bli bedre kjent med det nye Bouvet-huset! Kjør fort, og vinn en premie verdig en racing-sjafør!',
            image: 'http://fagutvalget.no/wp-content/blogs.dir/10/files/2015/04/bouvet_logo.png',
            href: 'https://bouvet.no',
        }, function (response) {
        });
    };
    AppComponent.prototype.getToplist = function () {
        var _this = this;
        this.toplistService.getToplist()
            .subscribe(function (toplist) { return _this.toplist = toplist; }, function (err) {
            console.log(err);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html',
        styleUrls: [
            'app/app.component.css',
        ],
        providers: [toplist_service_1.ToplistService]
    }),
    __metadata("design:paramtypes", [toplist_service_1.ToplistService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map