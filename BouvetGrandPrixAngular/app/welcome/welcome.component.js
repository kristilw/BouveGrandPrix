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
var core_1 = require('@angular/core');
var WelcomeComponent = (function () {
    //@ViewChild('welcome_carousel') input; 
    //@ViewChild('welcome_carousel') carousel: ElementRef; 
    function WelcomeComponent(elementRef) {
        this.elementRef = elementRef;
    }
    WelcomeComponent.prototype.ngAfterViewInit = function () {
        $("#welcome_carousel").carousel();
        //this.carousel.nativeElement.carousel();
        //console.log(this.input.nativeElement.value);
        //this.input.nativeElement.carousel();
    };
    WelcomeComponent = __decorate([
        core_1.Component({
            selector: 'welcome-screen',
            templateUrl: 'app/welcome/welcome.component.html',
            styleUrls: [
                'app/welcome/welcome.component.css',
                'app/styles/shared.css'
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map