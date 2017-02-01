/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToplistService } from '../services/toplist.service';
import { ViewRecord } from '../services/viewRecord';

declare var jQuery: any;

@Component({
    selector: 'welcome-screen',
    templateUrl: 'app/welcome/welcome.component.html',
    styleUrls: [
        'app/welcome/welcome.component.css',
    ]
})

export class WelcomeComponent {
    //@ViewChild('welcome_carousel') input; 
    //@ViewChild('welcome_carousel') carousel: ElementRef; 

    carouselSelector: number = 0;

    toplist: ViewRecord[];

    constructor(
        private elementRef: ElementRef,
        private toplistService: ToplistService) {
    }

    ngAfterViewInit() {
        this.getToplist();

        $("#welcome_carousel").carousel();

        let elem1: any = $("#carousel_indicator_btn_active_0");
        let elem2: any = $("#carousel_indicator_btn_active_1");

        elem1.css("display", "block");
        elem2.css("display", "none");

        $("#welcome_carousel").on('slide.bs.carousel', function () {
            let elem1: any = $("#carousel_indicator_btn_active_0");
            let elem2: any = $("#carousel_indicator_btn_active_1");

            if (this.carouselSelector === 1) {
                this.carouselSelector = 0;
                
                elem1.css("display", "block");
                elem2.css("display", "none");
            } else {
                this.carouselSelector = 1;

                elem1.css("display", "none");
                elem2.css("display", "block");
            }

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
    
}