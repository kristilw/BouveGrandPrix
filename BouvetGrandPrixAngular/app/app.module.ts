import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { WelcomeComponent } from "./welcome/welcome.component"

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {
                path: 'welcome-screen/:id',
                component: WelcomeComponent
            },
            {
                path: '**',
                component: WelcomeComponent
            }
        ])
    ],
    declarations: [
        AppComponent,
        WelcomeComponent
    ],
    bootstrap: [
        AppComponent
    ],


  exports: [RouterModule]
})
export class AppModule { }