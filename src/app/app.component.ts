import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppState } from './reducers/index';
import { Store } from '@ngrx/store';
//<ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
       

@Component({
    selector: 'my-app',
    template: ` 
        <navigation></navigation>
        <router-outlet></router-outlet>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
    config: any;

    constructor(
        private store: Store<AppState>
        ){
        console.log("AppComponent ctor");
    }

    ngOnInit() {
        //console.log("config object in app component");
        console.log("AppComponent ngOnInit"); 
     }
}
