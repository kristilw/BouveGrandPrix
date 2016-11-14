/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

//import { Component} from '@angular/core';

import { Component, ElementRef, ViewChild } from '@angular/core';

//import { ViewChild, ViewChildren, Component, QueryList,  } from 'angular2/core'
declare var jQuery: any;

@Component({
    selector: 'welcome-screen',
    templateUrl: 'app/welcome/welcome.component.html',
    styleUrls: [
        'app/welcome/welcome.component.css',
        'app/styles/shared.css'
    ]
})

export class WelcomeComponent {
    //@ViewChild('welcome_carousel') input; 
    //@ViewChild('welcome_carousel') carousel: ElementRef; 

    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        $("#welcome_carousel").carousel();
        //this.carousel.nativeElement.carousel();
        //console.log(this.input.nativeElement.value);
        //this.input.nativeElement.carousel();
    }
    
}