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
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var welcome_component_1 = require("./welcome/welcome.component");
var about_component_1 = require("./about/about.component");
var choseCar_component_1 = require("./choseCar/choseCar.component");
var game_component_1 = require("./game/game.component");
var countdown_component_1 = require("./game/countdown/countdown.component");
var goal_component_1 = require("./game/goal/goal.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot([
                {
                    path: 'welcome',
                    component: welcome_component_1.WelcomeComponent
                },
                {
                    path: 'choseCar',
                    component: choseCar_component_1.ChoseCarComponent
                },
                {
                    path: 'game/:id',
                    component: game_component_1.GameComponent
                },
                {
                    path: 'about',
                    component: about_component_1.AboutComponent
                },
                {
                    path: '**',
                    component: welcome_component_1.WelcomeComponent
                }
            ])
        ],
        declarations: [
            app_component_1.AppComponent,
            welcome_component_1.WelcomeComponent,
            about_component_1.AboutComponent,
            choseCar_component_1.ChoseCarComponent,
            game_component_1.GameComponent,
            goal_component_1.GoalComponent,
            countdown_component_1.CountdownComponent
        ],
        bootstrap: [
            app_component_1.AppComponent
        ],
        exports: [router_1.RouterModule]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map