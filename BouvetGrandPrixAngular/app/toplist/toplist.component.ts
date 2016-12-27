import { Component, ElementRef } from '@angular/core';

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

    constructor(public element: ElementRef) {

        for (let i = 0; i < 30; i++) {
            this.toplist.push({
                "name": "Nissen",
                "company": "Bouvet",
                "time": i*111,
            })

            this.toplist.push({
                "name": "Rudolf",
                "company": "haflsund",
                "time": i * 111+30,
            })

            this.toplist.push({
                "name": "Erna Solberg",
                "company": "Bouvet",
                "time": i * 111+50,
            })
        }

    }

    scrollAnimation(element: any, direction: number): void {
        let travelDistance = window.innerHeight*0.5;
        let speed = 6*travelDistance/30;

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                element.scrollTop += direction * speed * ((i / 30) - (i / 30) * (i / 30));
            }, i * 20);
        }

    }

    scrollUp(event: any): void {
        if (event.isTrusted) {
            this.scrollAnimation(this.element.nativeElement.querySelector("[id='toplist_scroll']"), -1);
        }
    }

    scrollDown(event: any): void {
        if (event.isTrusted) {
            this.scrollAnimation(this.element.nativeElement.querySelector("[id='toplist_scroll']"),1);
        }
    }
}