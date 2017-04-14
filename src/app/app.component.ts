import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Title }     from '@angular/platform-browser';

import { AuthenticationService } from './user/auth.service';
import { User } from './user/user.model';
import { Store } from '@ngrx/store';
import { AppState, UserActions } from './app.state';
import { environment } from '../environments/environment';
import { ConfigService } from './config/config.service';
//<ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
       

@Component({
    selector: 'app-root',
    template: ` 
    <ngrx-store-log-monitor *ngIf="show" toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
    <div class="container">
        <navigation></navigation>
        <router-outlet></router-outlet>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
    config: any;
    currentUser: any;
    show: boolean = false;
    title: string = "";

    constructor(
        private store: Store<AppState>,
        private authService: AuthenticationService,
        private titleService: Title,
        private configService: ConfigService 
    ){
        console.log("AppComponent ctor");
				// TODO: environment file or settings in webpack
				// not sure which one I want to use
        this.show = environment.production ? true : false;
				console.log(process.env);
    }

    ngOnInit() {
        console.log("AppComponent loaded"); 

        this.loadUserStateFromLocalStorage();
        this.setTitle(); 
     }

     loadUserStateFromLocalStorage(){
        let localStorageUser: User = this.authService.getCurrentUser();
        if(localStorageUser && localStorageUser.isAuthenticated){
            this.store.dispatch({type: UserActions.USER_LOGIN, payload: localStorageUser});
        }
     }
     public setTitle() {
        this.title = this.configService.get('title');
        this.titleService.setTitle( this.title );
    }
}



