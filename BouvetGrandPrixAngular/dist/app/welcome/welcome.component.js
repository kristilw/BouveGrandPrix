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
var toplist_service_1 = require("../services/toplist.service");
var WelcomeComponent = (function () {
    function WelcomeComponent(elementRef, toplistService) {
        this.elementRef = elementRef;
        this.toplistService = toplistService;
        this.carouselSelector = 0;
    }
    WelcomeComponent.prototype.animateStartButton = function (element) {
        var button = $(element);
        var t = setTimeout(function () {
            clearTimeout(t);
            $(button).css({ opacity: 1 });
        }, 3000);
    };
    WelcomeComponent.prototype.animateLogoMask = function (element) {
        var messageElement = $(element);
        var t = setTimeout(function () {
            clearTimeout(t);
            $(messageElement).css({ width: 0 });
        }, 2500);
    };
    WelcomeComponent.prototype.animateLogo = function (element) {
        var messageElement = $(element);
        var t = setTimeout(function () {
            clearTimeout(t);
            $(messageElement).addClass('animate');
        }, 1500);
    };
    WelcomeComponent.prototype.animateIntroText = function (element) {
        var log = console.log.bind(console), messageElement = document.querySelector(element), text = messageElement.innerText.trim();
        var words = text.split(' ');
        var work = [];
        words.forEach(function (word) {
            var splitWord = word.split('').map(function (char, index) {
                return '<i>' + char + '</i>';
            }).join('');
            work.push(splitWord);
        });
        var formattedWords = work.map(function (word, index) {
            return '<span class="test-span">' + word + '</span>';
        }).join(' ');
        messageElement.innerHTML = formattedWords;
        messageElement.classList.add('animate');
        messageElement.classList.remove('animate');
        messageElement.offsetHeight;
        var t = setTimeout(function () {
            clearTimeout(t);
            messageElement.classList.add('animate');
        }, 2500);
    };
    WelcomeComponent.prototype.ngAfterViewInit = function () {
        this.getToplist();
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
        this.animateIntroText('.js-typewriter-mobile');
        this.animateIntroText('.js-typewriter-desktop');
        this.animateStartButton('#start_engine_button');
        this.animateLogo('.logo-container');
    };
    WelcomeComponent.prototype.getToplist = function () {
        var _this = this;
        this.toplistService.getToplist()
            .subscribe(function (toplist) { return _this.toplist = toplist; }, function (err) {
            console.log(err);
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
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        toplist_service_1.ToplistService])
], WelcomeComponent);
exports.WelcomeComponent = WelcomeComponent;

//# sourceMappingURL=welcome.component.js.map
