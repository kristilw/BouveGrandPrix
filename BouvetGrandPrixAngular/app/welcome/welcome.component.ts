/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />

import { Component, ElementRef, ViewChild } from '@angular/core';

//import { ViewChild, ViewChildren, Component, QueryList,  } from 'angular2/core'


@Component({
    selector: 'welcome-screen',
    templateUrl: 'app/welcome/welcome.component.html',
    styleUrls: [
        'app/welcome/welcome.component.css',
        'app/styles/shared.css'
    ]
})

export class WelcomeComponent {
    @ViewChild('welcome_carousel') input: ElementRef; 

    ngAfterViewInit() {
        this.input.nativeElement.carousel();
    }
    
}