"use strict";var __decorate=this&&this.__decorate||function(t,e,o,n){var r,a=arguments.length,p=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(t,e,o,n);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(p=(a<3?r(p):a>3?r(e,o,p):r(e,o))||p);return a>3&&p&&Object.defineProperty(e,o,p),p},__metadata=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},core_1=require("@angular/core"),toplist_service_1=require("./services/toplist.service"),AppComponent=function(){function t(t){this.toplistService=t}return t.prototype.ngOnInit=function(){var t=L.map("map",{center:L.latLng(59.931,10.72),zoom:13,zoomControl:!1,attributionControl:!1});L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbHciLCJhIjoiY2l1dmw3aWttMDAwcjJ1cXc3bmZrMnExdCJ9.cxPXQumqqwNRhfWsj0Clvg",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://mapbox.com">Mapbox</a>',maxZoom:18}).addTo(t),L.control.attribution({position:"topright"}).addTo(t),$("#menu_modal").on("show.bs.modal",function(){console.log("show");var t=document.getElementById("router_outlet_div");t.style.opacity="0";var e=document.getElementById("menu_btn");e.classList.toggle("glyphicon-remove",!0),e.classList.toggle("glyphicon-menu-hamburger",!1)}),$("#menu_modal").on("hide.bs.modal",function(){console.log("hide");var t=document.getElementById("router_outlet_div");t.style.opacity="1";var e=document.getElementById("menu_btn");e.classList.toggle("glyphicon-remove",!1),e.classList.toggle("glyphicon-menu-hamburger",!0)}),this.getToplist()},t.prototype.getToplist=function(){var t=this;this.toplistService.getToplistSlow().then(function(e){return t.toplist=e})},t}();AppComponent=__decorate([core_1.Component({selector:"my-app",templateUrl:"app/app.component.html",styleUrls:["app/app.component.css"],providers:[toplist_service_1.ToplistService]}),__metadata("design:paramtypes",[toplist_service_1.ToplistService])],AppComponent),exports.AppComponent=AppComponent;