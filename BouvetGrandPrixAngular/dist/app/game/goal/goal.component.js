"use strict";var __decorate=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(n<3?i(a):n>3?i(t,o,a):i(t,o))||a);return n>3&&a&&Object.defineProperty(t,o,a),a},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},core_1=require("@angular/core"),toplist_service_1=require("../../services/toplist.service"),record_1=require("../../services/record"),GoalComponent=function(){function e(e){this.toplistService=e,this.user_name="",this.user_email="",this.user_company="",this.saveRecord_eventEmitter=new core_1.EventEmitter,this.restartGame_eventEmitter=new core_1.EventEmitter}return e.prototype.registerRecord=function(){this.completionTime-this.completionTime%1;if(null!==this.completionTime&&this.user_name.length>2&&this.user_email.length>5){var e=new record_1.Record(this.completionTime,this.user_name,this.user_email,this.user_company);console.log("newRecord: inside goal.component ",e),this.toplistService.saveRecord(e,this.saveRecord_eventEmitter).then(function(e){console.log("This is my position: "+e.position),e.event.emit(e.position)},function(e){console.log("failed getRecord")})}else console.log("Error with inputs")},e.prototype.restartGame=function(){this.restartGame_eventEmitter.emit()},e.prototype.nameChange=function(e){this.user_name=e},e.prototype.emailChange=function(e){this.user_email=e},e.prototype.companyChange=function(e){this.user_company=e},e}();__decorate([core_1.Input(),__metadata("design:type",Number)],GoalComponent.prototype,"completionTime",void 0),__decorate([core_1.Output(),__metadata("design:type",core_1.EventEmitter)],GoalComponent.prototype,"saveRecord_eventEmitter",void 0),__decorate([core_1.Output(),__metadata("design:type",core_1.EventEmitter)],GoalComponent.prototype,"restartGame_eventEmitter",void 0),GoalComponent=__decorate([core_1.Component({selector:"goal",templateUrl:"app/game/goal/goal.component.html",styleUrls:["app/game/goal/goal.component.css"]}),__metadata("design:paramtypes",[toplist_service_1.ToplistService])],GoalComponent),exports.GoalComponent=GoalComponent;
//# sourceMappingURL=goal.component.js.map
