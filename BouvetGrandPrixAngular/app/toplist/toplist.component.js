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
var ToplistComponent = (function () {
    function ToplistComponent() {
        this.toplist = [];
        this.toplist.push({
            "name": "Nissen",
            "company": "Bouvet",
            "time": 42000,
        });
        this.toplist.push({
            "name": "Rudolf",
            "company": "Hafslund",
            "time": 73000,
        });
        this.toplist.push({
            "name": "Snehvit",
            "company": "Bouvet",
            "time": 75000,
        });
        this.toplist.push({
            "name": "Nissen",
            "company": "Bouvet",
            "time": 42000,
        });
        this.toplist.push({
            "name": "Rudolf",
            "company": "Hafslund",
            "time": 73000,
        });
        this.toplist.push({
            "name": "Snehvit",
            "company": "Bouvet",
            "time": 75000,
        });
        this.toplist.push({
            "name": "Nissen",
            "company": "Bouvet",
            "time": 42000,
        });
        this.toplist.push({
            "name": "Rudolf",
            "company": "Hafslund",
            "time": 73000,
        });
        this.toplist.push({
            "name": "Snehvit",
            "company": "Bouvet",
            "time": 75000,
        });
    }
    return ToplistComponent;
}());
ToplistComponent = __decorate([
    core_1.Component({
        selector: 'about-screen',
        templateUrl: 'app/toplist/toplist.component.html',
        styleUrls: [
            'app/toplist/toplist.component.css',
            'app/styles/shared.css'
        ]
    }),
    __metadata("design:paramtypes", [])
], ToplistComponent);
exports.ToplistComponent = ToplistComponent;
//# sourceMappingURL=toplist.component.js.map