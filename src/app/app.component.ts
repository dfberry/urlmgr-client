import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationService } from './user/auth.service';
import { User } from './user/user.model';
import { Store } from '@ngrx/store';
import { AppState, UserActions } from './app.state';
//<ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
       

@Component({
    selector: 'my-app',
    template: ` 
    <ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
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
        private authService: AuthenticationService
    ){
        console.log("AppComponent ctor");

    // TODO:subscribe to current user
        
    }

    ngOnInit() {
        console.log("AppComponent ngOnInit"); 

        this.loadUserStateFromLocalStorage() 
     }

     loadUserStateFromLocalStorage(){
        let localStorageUser: User = this.authService.getCurrentUser();
        if(localStorageUser && localStorageUser.isAuthenticated){
            this.store.dispatch({type: UserActions.USER_LOGIN, payload: localStorageUser});
        }
     }
}

