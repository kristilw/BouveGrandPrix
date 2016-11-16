
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { WelcomeComponent } from "./welcome/welcome.component"
import { AboutComponent } from "./about/about.component"
import { ChoseCarComponent } from "./choseCar/choseCar.component"
import { GameComponent } from "./game/game.component"
import { CountdownComponent } from "./game/countdown/countdown.component"

@NgModule({
    imports: [
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
                path: '**',
                component: WelcomeComponent
            }
        ])
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        AboutComponent,
        ChoseCarComponent,
        GameComponent,
        CountdownComponent
    ],
    bootstrap: [
        AppComponent
    ],


  exports: [RouterModule]
})
export class AppModule { }