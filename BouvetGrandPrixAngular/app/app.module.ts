
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { WelcomeComponent } from "./welcome/welcome.component";
import { AboutComponent } from "./about/about.component";
import { PrizeComponent } from "./prize/prize.component";
import { NewOfficeComponent } from "./newOffice/newOffice.component";

import { ChoseCarComponent } from "./choseCar/choseCar.component";
import { GameComponent } from "./game/game.component";
import { CountdownComponent } from "./game/countdown/countdown.component";
import { GoalComponent } from "./game/goal/goal.component";
import { ToplistComponent } from "./toplist/toplist.component";
import { TimePipe } from "./pipe/time.pipe";
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        RouterModule.forRoot([
            {
                path: 'welcome',
                component: WelcomeComponent
            },
            {
                path: 'choseCar',
                component: ChoseCarComponent
            },
            {
                path: 'game/:id',
                component: GameComponent
            },
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'prize',
                component: PrizeComponent
            },
            {
                path: 'newOffice',
                component: NewOfficeComponent
            },
            {
                path: 'toplist/:id',
                component: ToplistComponent
            },
            {
                path: '**',
                component: WelcomeComponent
            }
        ])
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        AboutComponent,
        NewOfficeComponent,
        PrizeComponent,
        ChoseCarComponent,
        GameComponent,
        GoalComponent,
        CountdownComponent,
        ToplistComponent,
        TimePipe
    ],
    bootstrap: [
        AppComponent
    ],


  exports: [RouterModule]
})
export class AppModule { }