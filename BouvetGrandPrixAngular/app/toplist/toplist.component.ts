import { Component, ElementRef } from '@angular/core';

import { ToplistService } from '../services/toplist.service';
import { Record } from '../services/record';

@Component({
    selector: 'about-screen',
    templateUrl: 'app/toplist/toplist.component.html',
    styleUrls: [
        'app/toplist/toplist.component.css',
        'app/styles/shared.css'
    ]
})

export class ToplistComponent {
    toplist: Record[];

    constructor(public element: ElementRef, private toplistService: ToplistService) {
        
    }

    ngOnInit() {
        this.getToplist();
    }

    getToplist(): void {
        this.toplistService.getToplistSlow().then(toplist => this.toplist = toplist);
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