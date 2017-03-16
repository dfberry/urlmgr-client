import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ConfigService } from '../app/services/index';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationService } from './user/auth.service';
import { User } from './user/user.model';
import { Store } from '@ngrx/store';
import { AppState, UserStates } from './app.state';
//<ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
       

@Component({
    selector: 'my-app',
    template: ` 
    <!--<ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>-->
        <navigation></navigation>
        <router-outlet></router-outlet>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
    config: any;
    currentUser: any;

    constructor(
        private store: Store<AppState>,
        private configService: ConfigService,
        private authService: AuthenticationService
    ){
        console.log("AppComponent ctor");

    // TODO:subscribe to current user
        
    }

    ngOnInit() {
        this.config =  this.configService.config;
        //console.log("config object in app component");
        console.log("AppComponent ngOnInit"); 

        this.loadUserStateFromLocalStorage() 
     }

     loadUserStateFromLocalStorage(){
        let localStorageUser: User = this.authService.getCurrentUser();
        if(localStorageUser && localStorageUser.isAuthenticated){
            this.store.dispatch({type: UserStates.USER_LOGIN, payload: localStorageUser});
        }
     }
}

