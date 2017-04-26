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
var TimePipe = (function () {
    function TimePipe() {
    }
    TimePipe.prototype.transform = function (value, args) {
        if (value === null || value < 0) {
            return "404, time not found";
        }
        if (args[0] === 'm') {
            value /= 1000;
        }
        if (value > 100000) {
            return "-";
        }
        var milliseconds_string = (Math.floor((value * 100 % 100))).toString();
        if (milliseconds_string.length === 1)
            milliseconds_string = "0" + milliseconds_string;
        var seconds_string = (Math.floor((value % 60))).toString();
        if (seconds_string.length === 1)
            seconds_string = "0" + seconds_string;
        var minute_string = (Math.floor((value / 60))).toString();
        if (minute_string.length === 1)
            minute_string = "0" + minute_string;
        return minute_string + "." + seconds_string + "." + milliseconds_string;
    };
    return TimePipe;
}());
TimePipe = __decorate([
    core_1.Pipe({
        name: 'recordTime'
    }),
    __metadata("design:paramtypes", [])
], TimePipe);
exports.TimePipe = TimePipe;

//# sourceMappingURL=time.pipe.js.map
