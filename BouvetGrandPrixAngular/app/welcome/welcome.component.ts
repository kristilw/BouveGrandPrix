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

    animateLogo(element){

        var messageElement = $(element);
        var t = setTimeout(function() {
            clearTimeout(t);
            $(messageElement).css({width:0});
        },2000);

    }

    animateIntroText(element){


        var log = console.log.bind(console),
            messageElement = document.querySelector(element),
            text = messageElement.innerText.trim();
        var words = text.split(' ');

        var work = [];

        words.forEach(function (word) {
            var splitWord = word.split('').map(function (char, index) {
                return '<i>' + char + '</i>';
            }).join('');
            work.push(splitWord);
        });

        var formattedWords = work.map(function (word, index) {
            return '<span class="test-span">' + word + '</span>';
        }).join(' ');

        messageElement.innerHTML = formattedWords;
        messageElement.classList.add('animate');

        messageElement.classList.remove('animate');
        messageElement.offsetHeight; // force reflow

        var t = setTimeout(function () {
            clearTimeout(t);
            messageElement.classList.add('animate');
        },2500);

    }

    ngAfterViewInit(){


        this.getToplist();

        //$("#welcome_carousel").carousel();

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

        this.animateIntroText('.js-typewriter-mobile');
        this.animateIntroText('.js-typewriter-desktop');
        this.animateLogo('.bouvet_logo_mask');


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