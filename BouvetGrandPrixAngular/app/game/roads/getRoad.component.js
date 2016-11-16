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
var GetRoadComponent = (function () {
    function GetRoadComponent() {
    }
    GetRoadComponent.prototype.getRoad = function () {
        return "59.93502,10.758569999999999,0,p0\n                59.9347624353079,10.758993142270919,1,b0\n                59.93474,10.759030000000001,2,b1\n                59.93471674871557,10.759064876963876,3,b2\n                59.93470325128442,10.759085123110609,4,b0\n                59.93468,10.759119999999998,5,b1\n                59.93466830303036,10.759174585888072,6,b2\n                59.93466169696963,10.759205414171465,7,b0\n                59.93465,10.75926,8,b1\n                59.934619107570114,10.759237688692789,9,b2";
    };
    GetRoadComponent = __decorate([
        core_1.Component({
            selector: 'about-screen',
            template: '',
        }), 
        __metadata('design:paramtypes', [])
    ], GetRoadComponent);
    return GetRoadComponent;
}());
exports.GetRoadComponent = GetRoadComponent;
//# sourceMappingURL=getRoad.component.js.map