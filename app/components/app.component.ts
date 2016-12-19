import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ConfigService } from '../services/index';
import { RouterModule, Routes } from '@angular/router';

@Component({
    moduleId: module.id, //system js variable name for relative path
    selector: 'my-app',
    template: ` 
       <ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
       
        <router-outlet></router-outlet>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
    config: any;

    constructor(private configService: ConfigService){}

    ngOnInit() {
        this.config =  this.configService.config;
        console.log("config object in app component");
        console.log(this.config);   
     }
}
