import { Component } from '@angular/core';
/// <reference path="../../typings/leaflet/leaflet.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

import {OnInit, OnDestroy } from '@angular/core';

import { Map } from 'leaflet';
import { LatLng } from 'leaflet';

@Component({
    selector: 'newOffice-screen',
    templateUrl: 'app/newOffice/newOffice.component.html',
    styleUrls: [
        'app/newOffice/newOffice.component.css',
    ]
})

export class NewOfficeComponent {
    map_newOffice: any;

    ngOnInit() {
        this.map_newOffice = L.map('map_newOffice', {
            center: L.latLng(59.91902, 10.74857),
            zoomControl: false,
            fadeAnimation: true,
            zoomAnimation: true,
            zoomAnimationThreshold: 20,
            zoom: 13,
            maxZoom: 20,
            attributionControl: false
        });

        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbHciLCJhIjoiY2l1dmw3aWttMDAwcjJ1cXc3bmZrMnExdCJ9.cxPXQumqqwNRhfWsj0Clvg', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 20
        }).addTo(this.map_newOffice);

        L.control.attribution({ position: 'topright' }).addTo(this.map_newOffice);

        this.zoomToNewOffice();

        var that = this;
        this.map_newOffice.on('zoomend', function () {
            that.updateIconSize();
        });
    }

    zoomLevel: number = 16;
    zoomToNewOffice(): void {
        setTimeout(() => {
            this.map_newOffice.flyTo([59.930338, 10.711191], this.zoomLevel, {
                animate: true,
                duration: 4 // in seconds
            });
        }, 1500);

        setTimeout(() => {
            this.finishedZoomAnimation();
        }, 5500);
    }

    bouvetHuset_marker: any = null;
    finishedZoomAnimation(): void {
        this.updateIconSize();
    }

    updateIconSize() {
        if (this.bouvetHuset_marker !== null) {
            this.map_newOffice.removeLayer(this.bouvetHuset_marker);
        }

        this.zoomLevel = this.map_newOffice.getZoom();
        let height_bouvetHuset = 220 * Math.pow(0.5, 18 - this.zoomLevel);
        let width_bouvetHuset = 207 * Math.pow(0.5, 18 - this.zoomLevel);

        var bouvetHuset_Icon = L.icon({
            iconUrl: '../app/img/map/BouvetHuset_Huset.png',

            iconSize: [height_bouvetHuset, width_bouvetHuset], // size of the icon
            iconAnchor: [height_bouvetHuset / 2, width_bouvetHuset / 2], // point of the icon which will correspond to marker's location
        });

        this.bouvetHuset_marker = L.marker([59.930338, 10.711191], { icon: bouvetHuset_Icon }).addTo(this.map_newOffice);
    }
}