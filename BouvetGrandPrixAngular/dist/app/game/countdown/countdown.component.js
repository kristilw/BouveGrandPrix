/// <reference path="../../../typings/jquery/jquery.d.ts" />
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
        this.countDownTimer = "KJØR!";
    }
    CountdownComponent.prototype.countDownToZero = function () {
        var _this = this;
        $("#count_down_text").toggleClass("count_down_text_hoverEffect");
        console.log("start countdown");
        var _loop_1 = function (i) {
            setTimeout(function () {
                i = Math.floor(i * 10) / 10;
                if (i > 0) {
                    if (i % 1 === 0) {
                        _this.countDownTimer = "" + i + ".0";
                    }
                    else {
                        _this.countDownTimer = "" + i;
                    }
                }
                else {
                    _this.countDownTimer = "" + i + ".0";
                    _this.startGameCountdown.emit(true);
                }
            }, 1000 * (3 - i + 0.5));
            out_i_1 = i;
        };
        var out_i_1;
        for (var i = 3; i >= 0; i -= 0.1) {
            _loop_1(i);
            i = out_i_1;
        }
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