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
var GoalComponent = (function () {
    function GoalComponent() {
    }
    GoalComponent.prototype.ngOnChanges = function () {
        this.completionTime_string = this.TimeToString(this.completionTime);
    };
    GoalComponent.prototype.TimeToString = function (time) {
        if (time === null || time < 0) {
            return "404, time not found";
        }
        var milliseconds_string = (Math.floor((time * 100 % 100))).toString();
        if (milliseconds_string.length === 1)
            milliseconds_string = "0" + milliseconds_string;
        var seconds_string = (Math.floor((time % 60))).toString();
        if (seconds_string.length === 1)
            seconds_string = "0" + seconds_string;
        var minute_string = (Math.floor((time / 60))).toString();
        if (minute_string.length === 1)
            minute_string = "0" + minute_string;
        return minute_string + "." + seconds_string + "." + milliseconds_string;
    };
    return GoalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], GoalComponent.prototype, "completionTime", void 0);
GoalComponent = __decorate([
    core_1.Component({
        selector: 'goal',
        templateUrl: 'app/game/goal/goal.component.html',
        styleUrls: [
            'app/game/goal/goal.component.css',
            'app/styles/shared.css'
        ]
    }),
    __metadata("design:paramtypes", [])
], GoalComponent);
exports.GoalComponent = GoalComponent;
//# sourceMappingURL=goal.component.js.map