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
var toplist_service_1 = require("../../services/toplist.service");
var record_1 = require("../../services/record");
var GoalComponent = (function () {
    function GoalComponent(toplistService) {
        this.toplistService = toplistService;
        this.user_name = "";
        this.user_email = "";
        this.user_company = "";
        this.saveRecord_eventEmitter = new core_1.EventEmitter();
        this.goToAboutPage_eventEmitter = new core_1.EventEmitter();
    }
    GoalComponent.prototype.registerRecord = function () {
        var roundCompletionTime = this.completionTime - this.completionTime % 1;
        if (this.completionTime !== null && this.user_name.length > 2 && this.user_email.length > 5) {
            var newRecord = new record_1.Record(this.completionTime, this.user_name, this.user_email, this.user_company);
            console.log("newRecord: inside goal.component ", newRecord);
            this.toplistService.saveRecord(newRecord);
            this.saveRecord_eventEmitter.emit();
        }
        else {
            console.log("Error with inputs");
        }
        // test         //bodyString = "action=setScore&name=kindasuccess3&email=kindasuccess3%40test.com&time=123458&score=123458";
        //let newRecord = new Record(155113, "success123", "kindasuccess123@test.com", "Bouvet AS");
        //this.toplistService.saveRecord(newRecord);
    };
    GoalComponent.prototype.goToAboutPage = function () {
        this.goToAboutPage_eventEmitter.emit();
    };
    GoalComponent.prototype.nameChange = function (value) { this.user_name = value; };
    GoalComponent.prototype.emailChange = function (value) { this.user_email = value; };
    GoalComponent.prototype.companyChange = function (value) { this.user_company = value; };
    return GoalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], GoalComponent.prototype, "completionTime", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GoalComponent.prototype, "saveRecord_eventEmitter", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GoalComponent.prototype, "goToAboutPage_eventEmitter", void 0);
GoalComponent = __decorate([
    core_1.Component({
        selector: 'goal',
        templateUrl: 'app/game/goal/goal.component.html',
        styleUrls: [
            'app/game/goal/goal.component.css',
        ]
    }),
    __metadata("design:paramtypes", [toplist_service_1.ToplistService])
], GoalComponent);
exports.GoalComponent = GoalComponent;
//# sourceMappingURL=goal.component.js.map