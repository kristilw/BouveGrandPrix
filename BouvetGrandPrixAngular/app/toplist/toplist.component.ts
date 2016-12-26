import { Component } from '@angular/core';

@Component({
    selector: 'about-screen',
    templateUrl: 'app/toplist/toplist.component.html',
    styleUrls: [
        'app/toplist/toplist.component.css',
        'app/styles/shared.css'
    ]
})

export class ToplistComponent {
    toplist: Object[] = [];

    constructor() {
        this.toplist.push({
            "name": "Nissen",
            "company": "Bouvet",
            "time": 42031,
        })

        this.toplist.push({
            "name": "Rudolf",
            "company": "Hafslund",
            "time": 73456,
        })

        this.toplist.push({
            "name": "Snehvit",
            "company": "Bouvet",
            "time": 75000,
        })

        this.toplist.push({
            "name": "Nissen",
            "company": "Bouvet",
            "time": 42000,
        })

        this.toplist.push({
            "name": "Rudolf",
            "company": "Hafslund",
            "time": 73000,
        })

        this.toplist.push({
            "name": "Snehvit",
            "company": "Bouvet",
            "time": 75000,
        })

        this.toplist.push({
            "name": "Nissen",
            "company": "Bouvet",
            "time": 42000,
        })

        this.toplist.push({
            "name": "Rudolf",
            "company": "Hafslund",
            "time": 73000,
        })

        this.toplist.push({
            "name": "Snehvit",
            "company": "Bouvet",
            "time": 75000,
        })
    }
}