/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
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
//import { Component} from '@angular/core';
var core_1 = require("@angular/core");
var WelcomeComponent = (function () {
    function WelcomeComponent(elementRef) {
        this.elementRef = elementRef;
        //@ViewChild('welcome_carousel') input; 
        //@ViewChild('welcome_carousel') carousel: ElementRef; 
        this.carouselSelector = 0;
    }
    WelcomeComponent.prototype.ngAfterViewInit = function () {
        $("#welcome_carousel").carousel();
        var elem1 = $("#carousel_indicator_btn_active_0");
        var elem2 = $("#carousel_indicator_btn_active_1");
        elem1.css("display", "block");
        elem2.css("display", "none");
        $("#welcome_carousel").on('slide.bs.carousel', function () {
            var elem1 = $("#carousel_indicator_btn_active_0");
            var elem2 = $("#carousel_indicator_btn_active_1");
            if (this.carouselSelector === 1) {
                this.carouselSelector = 0;
                elem1.css("display", "block");
                elem2.css("display", "none");
            }
            else {
                this.carouselSelector = 1;
                elem1.css("display", "none");
                elem2.css("display", "block");
            }
        });
    };
    return WelcomeComponent;
}());
WelcomeComponent = __decorate([
    core_1.Component({
        selector: 'welcome-screen',
        templateUrl: 'app/welcome/welcome.component.html',
        styleUrls: [
            'app/welcome/welcome.component.css',
            'app/styles/shared.css'
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], WelcomeComponent);
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map