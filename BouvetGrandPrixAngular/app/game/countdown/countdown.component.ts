/// <reference path="../../../typings/jquery/jquery.d.ts" />

import { Component, Output, EventEmitter } from '@angular/core';
import { Map } from 'leaflet';
import { LatLng } from 'leaflet';

declare var jQuery: any;

@Component({
    selector: 'countdown-game',
    templateUrl: 'app/game/countdown/countdown.component.html',
    styleUrls: [
        'app/game/countdown/countdown.component.css',
        'app/styles/shared.css'
    ]
})

export class CountdownComponent {
    @Output() startGame: EventEmitter<boolean> = new EventEmitter<boolean>();

    countDownTimer: string = "start";

    countDownToZero(): void {
        $("#count_down_text").toggleClass("count_down_text_hoverEffect");

        console.log("start countdown");
        for (let i = 3; i >= 0; i-=0.1) {
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
                    this.startGame.emit(true);
                }
                
            }, 1000 * (3-i+0.5));
        }
    }
}