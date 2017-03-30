/// <reference path="../../../typings/jquery/jquery.d.ts" />

import { Component, Output, EventEmitter } from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'countdown-game',
    templateUrl: 'app/game/countdown/countdown.component.html',
    styleUrls: [
        'app/game/countdown/countdown.component.css',
    ]
})

export class CountdownComponent {
    @Output() startGameCountdown: EventEmitter<boolean> = new EventEmitter<boolean>();

    countDownTimer: string = "";
    countDownTimer_drive: string = "";

    showCountDownTimer:Boolean = false;

    start():void {


        let t = setTimeout(()=>{
            clearTimeout(t);
           this.countDownToZero();
        },800);
    }

    countDownToZero(): void {

        $("#count_down_text").toggleClass("count_down_text_hoverEffect");
        /*for (let i = 3; i >= 0; i-=0.1) {
            setTimeout(() => {
                i = Math.floor(i * 10) / 10;

                if (i > 0) {
                    if (i % 1 === 0) {
                        this.countDownTimer = "" + i + ".0";
                    } else {
                        this.countDownTimer = "" + i;
                    }
                } else {
                    this.countDownTimer = "" + i + ".0";
                    this.startGameCountdown.emit(true);
                }
                
            }, 1000 * (3-i+0.5));
        }*/

        let iVal = 3;

        let interval = setInterval(() => {

            if(!this.showCountDownTimer){
                this.showCountDownTimer = true;
            }

            if (iVal == 0) {
                this.countDownTimer = "";
                this.countDownTimer_drive = "KJØR!";
            } else {
                this.countDownTimer = "" + iVal;
            }

            if(iVal==-1){
                clearInterval(interval);
                this.startGameCountdown.emit(true);
            }
            else
            {
                iVal--;

            }

        },1000);


    }

    ngOnInit():void{

        this.start();

    }
}