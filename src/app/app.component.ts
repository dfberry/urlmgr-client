import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ConfigService } from '../app/services/index';
import { RouterModule, Routes } from '@angular/router';

//<ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
       

@Component({
    selector: 'my-app',
    template: ` 
        <login></login>
        <register></register>
        <router-outlet></router-outlet>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
    config: any;

    constructor(private configService: ConfigService){}

    ngOnInit() {
        this.config =  this.configService.config;
        //console.log("config object in app component");
        //console.log(this.config);   
     }
}
