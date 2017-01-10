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
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var ToplistService = (function () {
    function ToplistService(http) {
        this.http = http;
        this.serverUrl = 'app/server/server.php';
    }
    ToplistService.prototype.getToplist = function () {
        var bodyString = JSON.stringify({ action: 'getScores' }); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.serverUrl, bodyString, options) // ...using get request
            .map(function (res) { return console.log(res.json()); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(console.log(error) || 'Server error, could not load record'); }); //...errors if any
    };
    ToplistService.prototype.saveRecord = function (newRecord) {
        var bodyString = JSON.stringify({ action: 'setScore', name: newRecord.name, email: newRecord.email, time: newRecord.time, score: 0 }); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        console.log("setScore call :=> ||  ", bodyString);
        this.http.post(this.serverUrl, bodyString, options) // ...using post request
            .map(function (res) {
            var body;
            console.log("extract data: ", res);
            // check if empty, before call json
            if (res.text()) {
                body = res.json();
            }
            return body || {};
        }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error, could not save record'); }); //...errors if any
    };
    return ToplistService;
}());
ToplistService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ToplistService);
exports.ToplistService = ToplistService;
//# sourceMappingURL=toplist.service.js.map