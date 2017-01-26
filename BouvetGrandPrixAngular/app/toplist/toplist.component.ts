import { Component, ElementRef, OnDestroy } from '@angular/core';

import { ToplistService } from '../services/toplist.service';
import { ViewRecord } from '../services/viewRecord';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'about-screen',
    templateUrl: 'app/toplist/toplist.component.html',
    styleUrls: [
        'app/toplist/toplist.component.css',
    ]
})

export class ToplistComponent {
    toplist: ViewRecord[];
    private routeParamSubscription: any = null;

    focusOnRecord: number = 0;
    scrolledTofocusOn: boolean = false;
    

    constructor(
        public element: ElementRef,
        private toplistService: ToplistService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.routeParamSubscription = this.route.params.subscribe(
            (param: any) => {
                let id = param['id'];
                this.focusOnRecord = id.toString() - 1;
                this.getToplist();
                this.navigateToFocus();
            });
    }

    getToplist(): void {
        this.toplistService.getToplist()
            .subscribe(
            toplist => this.toplist = toplist, //Bind to view
            err => {
                console.log(err);
            });
    }

    navigateToFocus(): void {
        if (this.scrolledTofocusOn === false) {
            console.log("start scroll");

            let scrollElem = this.element.nativeElement.querySelector("[id='toplist_scroll']");
            let distance = (this.focusOnRecord - 3) * 55.15;

            if (this.focusOnRecord < 101) {
                this.scrolledTofocusOn = true;
                setTimeout(() => {
                    scrollElem.scrollTop = 0;
                    this.scrollAnimation(scrollElem, distance, 500 * Math.sqrt(Math.min(this.focusOnRecord - 3, 100)));
                }, 1500);
            } else {
                setTimeout(() => {
                    scrollElem.scrollTop = distance;
                }, 50);
            }
        }
    }

    scrollAnimation_smoothnes: number = 20; //ms between each movement
    scrollAnimation(element: any, distance: number, time: number): void {
        let intervals = Math.floor(time / this.scrollAnimation_smoothnes);
        let speed = 6 * distance / intervals;

        for (let i = 0; i < intervals; i++) {
            setTimeout(() => {
                let delta = speed * ((i / intervals) - (i / intervals) * (i / intervals));
                element.scrollTop += delta;
            }, i * this.scrollAnimation_smoothnes);
        }
    }

    scrollByButton(element: any, direction: number): void {
        let travelDistance = direction * window.innerHeight * 0.5;
        this.scrollAnimation(element, travelDistance, 750);
    }

    scrollUp(event: any): void {
        if (event.isTrusted) {
            this.scrollByButton(this.element.nativeElement.querySelector("[id='toplist_scroll']"), -1);
        }
    }

    scrollDown(event: any): void {
        if (event.isTrusted) {
            this.scrollByButton(this.element.nativeElement.querySelector("[id='toplist_scroll']"),1);
        }
    }

    ngOnDestroy() {
        if (this.routeParamSubscription !== null) {
            this.routeParamSubscription.unsubscribe();
        }
    }

    ngOnChange() {
        
    }
}