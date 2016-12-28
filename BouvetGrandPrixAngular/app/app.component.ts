/// <reference path="../typings/leaflet/leaflet.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToplistService } from './services/toplist.service';
import { Record } from './services/record';

import { Map } from 'leaflet';
import { LatLng } from 'leaflet';

declare var jQuery: any;


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: [
        'app/styles/app.component.css',
        'app/styles/shared.css'
    ],
    providers: [ToplistService]
})

export class AppComponent {
    toplist: Record[];

    constructor(private toplistService: ToplistService) {
    }


    ngOnInit() {
        var map_ = L.map('map', {
            center: L.latLng(59.931, 10.720),
            zoom: 13,
            zoomControl: false
        });

        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbHciLCJhIjoiY2l1dmw3aWttMDAwcjJ1cXc3bmZrMnExdCJ9.cxPXQumqqwNRhfWsj0Clvg', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(map_);


        $('#menu_modal').on('show.bs.modal', function () {
            console.log("show");

            var elem: any = document.getElementById("router_outlet_div");//$('#router_outlet');
            elem.style.opacity = "0";
        })

        $('#menu_modal').on('hide.bs.modal', function () {
            console.log("hide");

            var elem: any = document.getElementById("router_outlet_div");//$('#router_outlet');
            elem.style.opacity = "1";
        })

        this.getToplist();
    }


    getToplist(): void {
        this.toplistService.getToplistSlow().then(toplist => this.toplist = toplist);
    }
}