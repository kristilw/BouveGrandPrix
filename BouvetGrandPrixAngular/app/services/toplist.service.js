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
var mockData_toplist_1 = require("./mockData_toplist");
var ToplistService = (function () {
    function ToplistService() {
    }
    ToplistService.prototype.getToplist = function () {
        console.log("get top list");
        return Promise.resolve(mockData_toplist_1.TOPLIST);
    };
    ToplistService.prototype.getToplistSlow = function () {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(_this.getToplist()); }, 2000);
        });
    };
    return ToplistService;
}());
ToplistService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ToplistService);
exports.ToplistService = ToplistService;
//# sourceMappingURL=toplist.service.js.map