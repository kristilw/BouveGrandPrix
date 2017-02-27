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
var toplist_service_1 = require("../services/toplist.service");
var router_1 = require("@angular/router");
var ToplistComponent = (function () {
    function ToplistComponent(element, toplistService, route, router) {
        this.element = element;
        this.toplistService = toplistService;
        this.route = route;
        this.router = router;
        this.routeParamSubscription = null;
        this.focusOnRecord = 0;
        this.scrolledTofocusOn = false;
        this.scrollAnimation_smoothnes = 20;
    }
    ToplistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeParamSubscription = this.route.params.subscribe(function (param) {
            var id = param['id'];
            _this.focusOnRecord = id.toString() - 1;
            _this.getToplist();
            _this.navigateToFocus();
        });
    };
    ToplistComponent.prototype.getToplist = function () {
        var _this = this;
        this.toplistService.getToplist()
            .subscribe(function (toplist) { return _this.toplist = toplist; }, function (err) {
            console.log(err);
        });
    };
    ToplistComponent.prototype.navigateToFocus = function () {
        var _this = this;
        if (this.scrolledTofocusOn === false) {
            console.log("start scroll");
            var scrollElem_1 = this.element.nativeElement.querySelector("[id='toplist_scroll']");
            var distance_1 = (this.focusOnRecord - 3) * 55.15;
            if (this.focusOnRecord < 101) {
                this.scrolledTofocusOn = true;
                setTimeout(function () {
                    scrollElem_1.scrollTop = 0;
                    _this.scrollAnimation(scrollElem_1, distance_1, 500 * Math.sqrt(Math.min(_this.focusOnRecord - 3, 100)));
                }, 1500);
            }
            else {
                setTimeout(function () {
                    scrollElem_1.scrollTop = distance_1;
                }, 50);
            }
        }
    };
    ToplistComponent.prototype.scrollAnimation = function (element, distance, time) {
        var intervals = Math.floor(time / this.scrollAnimation_smoothnes);
        var speed = 6 * distance / intervals;
        var _loop_1 = function (i) {
            setTimeout(function () {
                var delta = speed * ((i / intervals) - (i / intervals) * (i / intervals));
                element.scrollTop += delta;
            }, i * this_1.scrollAnimation_smoothnes);
        };
        var this_1 = this;
        for (var i = 0; i < intervals; i++) {
            _loop_1(i);
        }
    };
    ToplistComponent.prototype.scrollByButton = function (element, direction) {
        var travelDistance = direction * window.innerHeight * 0.5;
        this.scrollAnimation(element, travelDistance, 750);
    };
    ToplistComponent.prototype.scrollUp = function (event) {
        if (event.isTrusted) {
            this.scrollByButton(this.element.nativeElement.querySelector("[id='toplist_scroll']"), -1);
        }
    };
    ToplistComponent.prototype.scrollDown = function (event) {
        if (event.isTrusted) {
            this.scrollByButton(this.element.nativeElement.querySelector("[id='toplist_scroll']"), 1);
        }
    };
    ToplistComponent.prototype.ngOnDestroy = function () {
        if (this.routeParamSubscription !== null) {
            this.routeParamSubscription.unsubscribe();
        }
    };
    ToplistComponent.prototype.ngOnChange = function () {
    };
    return ToplistComponent;
}());
ToplistComponent = __decorate([
    core_1.Component({
        selector: 'about-screen',
        templateUrl: 'app/toplist/toplist.component.html',
        styleUrls: [
            'app/toplist/toplist.component.css',
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        toplist_service_1.ToplistService,
        router_1.ActivatedRoute,
        router_1.Router])
], ToplistComponent);
exports.ToplistComponent = ToplistComponent;
//# sourceMappingURL=toplist.component.js.map