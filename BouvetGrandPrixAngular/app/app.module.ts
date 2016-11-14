import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { WelcomeComponent } from "./welcome/welcome.component"
import { AboutComponent } from "./about/about.component"

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {
                path: 'welcome/:id',
                component: WelcomeComponent
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
        AboutComponent
    ],
    bootstrap: [
        AppComponent
    ],


  exports: [RouterModule]
})
export class AppModule { }