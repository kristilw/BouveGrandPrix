"use strict";var __decorate=this&&this.__decorate||function(e,t,r,o){var n,a=arguments.length,i=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,o);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(i=(a<3?n(i):a>3?n(t,r,i):n(t,r))||i);return a>3&&i&&Object.defineProperty(t,r,i),i},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},core_1=require("@angular/core"),http_1=require("@angular/http"),Rx_1=require("rxjs/Rx");require("rxjs/add/operator/map"),require("rxjs/add/operator/catch");var ToplistService=function(){function e(e){this.http=e,this.serverUrl="http://localhost/server.php"}return e.prototype.getToplist=function(){var e="action=getScores",t=new http_1.Headers;t.append("Content-Type","application/x-www-form-urlencoded");var r=new http_1.RequestOptions({headers:t});return this.http.post(this.serverUrl,e,r).map(function(e){var t=e.json();return t}).catch(function(e){return Rx_1.Observable.throw(console.log(e)||"Server error, could not load record")})},e.prototype.saveRecord=function(e,t){var r=this,o="action=setScore&name="+e.name.trim()+"&email="+e.email.trim()+"&time="+e.time+"&score="+e.time,n=new http_1.Headers;n.append("Content-Type","application/x-www-form-urlencoded");var a=new http_1.RequestOptions({headers:n});return new Promise(function(e,n){r.http.post(r.serverUrl,o,a).toPromise().then(function(r){var o=r.json();e({position:o.position,event:t})}).catch(function(e){return Rx_1.Observable.throw(console.log(e)||"Server error, could not load record")})})},e}();ToplistService=__decorate([core_1.Injectable(),__metadata("design:paramtypes",[http_1.Http])],ToplistService),exports.ToplistService=ToplistService;
//# sourceMappingURL=toplist.service.js.map
