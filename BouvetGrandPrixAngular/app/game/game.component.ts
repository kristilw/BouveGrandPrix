/// <reference path="../../typings/leaflet/leaflet.d.ts" />

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountdownComponent } from "./countdown/countdown.component";
import { Router, ActivatedRoute, Params } from '@angular/router';


import { Map } from 'leaflet';
import { LatLng } from 'leaflet';

@Component({
    selector: 'game-screen',
    templateUrl: 'app/game/game.component.html',
    styleUrls: [
        'app/game/game.component.css',
        'app/styles/shared.css'
    ]
})

export class GameComponent {
    private subscription: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    showCountDownTimer: boolean = true;

    ngOnInit() {
        //console.log(this.route.params.value.id);

        this.subscription = this.route.params.subscribe(
            (param: any) => {
                let userId = param['id'];
                console.log(userId);
            });

        var map_ = L.map('map_game', {
            center: L.latLng(59.93502, 10.758569999999999),
            zoom: 15,
            zoomControl: false
        });

        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbHciLCJhIjoiY2l1dmw3aWttMDAwcjJ1cXc3bmZrMnExdCJ9.cxPXQumqqwNRhfWsj0Clvg', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(map_);
    }

    startGameFromCountdown(startGame: boolean): void {
        console.log("from game: " + startGame);
        this.showCountDownTimer = false;
    }

    printId(id: number): void {
        console.log(id)
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }
}