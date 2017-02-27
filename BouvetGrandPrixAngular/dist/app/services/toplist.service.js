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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var ToplistService = (function () {
    function ToplistService(http) {
        this.http = http;
        this.serverUrl = 'http://localhost/server.php';
    }
    ToplistService.prototype.getToplist = function () {
        var bodyString = 'action=getScores';
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.serverUrl, bodyString, options)
            .map(function (res) {
            var output = res.json();
            console.log(output);
            return output;
        })
            .catch(function (error) { return Rx_1.Observable.throw(console.log(error) || 'Server error, could not load record'); });
    };
    ToplistService.prototype.saveRecord = function (newRecord, event) {
        var _this = this;
        var bodyString = "action=setScore"
            + "&name=" + newRecord.name.trim()
            + "&email=" + newRecord.email.trim()
            + "&time=" + newRecord.time
            + "&score=" + newRecord.time;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.serverUrl, bodyString, options)
                .toPromise()
                .then(function (res) {
                var output = res.json();
                resolve({ 'position': output.position, 'event': event });
            })
                .catch(function (error) { return Rx_1.Observable.throw(console.log(error) || 'Server error, could not load record'); });
        });
    };
    return ToplistService;
}());
ToplistService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ToplistService);
exports.ToplistService = ToplistService;
//# sourceMappingURL=toplist.service.js.map