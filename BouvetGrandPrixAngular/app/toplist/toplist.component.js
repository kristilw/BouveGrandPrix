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
var ToplistComponent = (function () {
    function ToplistComponent(element) {
        this.element = element;
        this.toplist = [];
        for (var i = 0; i < 30; i++) {
            this.toplist.push({
                "name": "Nissen",
                "company": "Bouvet",
                "time": i * 111,
            });
            this.toplist.push({
                "name": "Rudolf",
                "company": "haflsund",
                "time": i * 111 + 30,
            });
            this.toplist.push({
                "name": "Erna Solberg",
                "company": "Bouvet",
                "time": i * 111 + 50,
            });
        }
    }
    ToplistComponent.prototype.scrollAnimation = function (element, direction) {
        var travelDistance = window.innerHeight * 0.5;
        var speed = 6 * travelDistance / 30;
        var _loop_1 = function (i) {
            setTimeout(function () {
                element.scrollTop += direction * speed * ((i / 30) - (i / 30) * (i / 30));
            }, i * 20);
        };
        for (var i = 0; i < 30; i++) {
            _loop_1(i);
        }
    };
    ToplistComponent.prototype.scrollUp = function (event) {
        if (event.isTrusted) {
            this.scrollAnimation(this.element.nativeElement.querySelector("[id='toplist_scroll']"), -1);
        }
    };
    ToplistComponent.prototype.scrollDown = function (event) {
        if (event.isTrusted) {
            this.scrollAnimation(this.element.nativeElement.querySelector("[id='toplist_scroll']"), 1);
        }
    };
    return ToplistComponent;
}());
ToplistComponent = __decorate([
    core_1.Component({
        selector: 'about-screen',
        templateUrl: 'app/toplist/toplist.component.html',
        styleUrls: [
            'app/toplist/toplist.component.css',
            'app/styles/shared.css'
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ToplistComponent);
exports.ToplistComponent = ToplistComponent;
//# sourceMappingURL=toplist.component.js.map