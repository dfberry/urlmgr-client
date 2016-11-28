import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { HttpModule  } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/toArray';
import { Url, AppState, UrlService } from '../reducers/index';
import { ConfigService } from '../services/index';

@Component({
    moduleId: module.id, //system js variable name for relative path
    selector: 'my-app',
    template: ` 
        <url-mgr [urls]="urls"></url-mgr>
    `,
    providers: [UrlService],
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
    config: any;
    urls: Url[];

    constructor(
        private urlService: UrlService, 
        private store: Store<AppState>, 
        private configService: ConfigService){}

    ngOnInit() {
        this.config =  this.configService.config;
        console.log("config object in app component");
        console.log(this.config);

        // get from http, put in state
        this.urlService.loadItems();

        // get out of state
        this.store.select(state => state.urls)
          .distinctUntilChanged()
          .subscribe(data => this.onUrlsEmitted(data));    
     }

    // executed once user data arrives from the store
    public onUrlsEmitted(data:Url[]){
        this.urls = data;
        //this.printOutState("urls", this.urls);
    }

    // DEBUG
    private printOutState(arrName:string, arr: Url[]){
        for(let i =0; i < arr.length; i++){
            console.log("app.component " + arrName + " " + i + " = " + JSON.stringify(arr[i]));
        }
    }
}
