import { Component } from '@angular/core';

@Component({
    selector: 'choseCar-screen',
    templateUrl: 'app/choseCar/choseCar.component.html',
    styleUrls: [
        'app/choseCar/choseCar.component.css',
    ]
})

export class ChoseCarComponent {
    cars: Object[] = [
        { imgSrc:'app/img/biler/bil_utenlykter_1.png', routerLink:'/game/1'},
        { imgSrc: 'app/img/biler/bil_utenlykter_2.png', routerLink: '/game/2' },
        { imgSrc: 'app/img/biler/bil_utenlykter_3.png', routerLink: '/game/3' },
        { imgSrc: 'app/img/biler/bil_utenlykter_4.png', routerLink: '/game/4' },
        { imgSrc: 'app/img/biler/bil_utenlykter_5.png', routerLink: '/game/5' },
        { imgSrc: 'app/img/biler/bil_utenlykter_6.png', routerLink: '/game/6' }
    ];

    ngOnInit() {
        
    }
}