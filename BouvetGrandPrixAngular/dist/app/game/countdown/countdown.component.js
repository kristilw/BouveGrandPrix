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
var CountdownComponent = (function () {
    function CountdownComponent() {
        this.startGameCountdown = new core_1.EventEmitter();
        this.countDownTimer = "";
        this.countDownTimer_drive = "";
        this.showCountDownTimer = false;
    }
    CountdownComponent.prototype.start = function () {
        var _this = this;
        var t = setTimeout(function () {
            clearTimeout(t);
            _this.countDownToZero();
        }, 800);
    };
    CountdownComponent.prototype.countDownToZero = function () {
        var _this = this;
        $("#count_down_text").toggleClass("count_down_text_hoverEffect");
        var iVal = 3;
        var interval = setInterval(function () {
            if (!_this.showCountDownTimer) {
                _this.showCountDownTimer = true;
            }
            if (iVal == 0) {
                _this.countDownTimer = "";
                _this.countDownTimer_drive = "KJØR!";
            }
            else {
                _this.countDownTimer = "" + iVal;
            }
            if (iVal == -1) {
                clearInterval(interval);
                _this.startGameCountdown.emit(true);
            }
            else {
                iVal--;
            }
        }, 1000);
    };
    CountdownComponent.prototype.ngOnInit = function () {
        this.start();
    };
    return CountdownComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CountdownComponent.prototype, "startGameCountdown", void 0);
CountdownComponent = __decorate([
    core_1.Component({
        selector: 'countdown-game',
        templateUrl: 'app/game/countdown/countdown.component.html',
        styleUrls: [
            'app/game/countdown/countdown.component.css',
        ]
    }),
    __metadata("design:paramtypes", [])
], CountdownComponent);
exports.CountdownComponent = CountdownComponent;

//# sourceMappingURL=countdown.component.js.map
