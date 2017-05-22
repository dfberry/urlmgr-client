import { OnInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { ClientAuthenticationService, User, UserEvent } from './user';
import { environment } from '../environments/environment';
import { ConfigService } from './config/config.service';
import { AppState } from './app.state';

// components included in 
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation.component'

// use redux devtools in chrome instead
//<ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>

@Component({
    selector: 'app-root',
    template: ` 
    <div class="container">
        <navigation [user]="user"></navigation>
        <router-outlet></router-outlet>
    </div>
    `
})
export class AppComponent implements OnInit {
    public title: string = "";
    user:User = new User();

    constructor(
        private clientAuthService: ClientAuthenticationService,     
        private configService: ConfigService,
        private appState: AppState,
        private titleService: Title,
        private userEvent: UserEvent,
        
    ){}
    // when app begins, let's get user from client localStorage if it exists
    // if it doesn't, just init User and set auth to false
    ngOnInit() {
        console.log("AppComponent loaded"); 


        this.setTitle(); 

        // subscribe to any state change of user
        this.registerBroadcast();

        // get localStorage User and set in state
        // if localStorage is empty, user is init'd but unauthorized
        this.setAppUser();

        this.appState.getCurrentUser()
        .distinctUntilChanged()
        .subscribe(user => {
            this.onUserChange(user);
        });
     }
    public onUserChange(user:User){
        console.log("app onUserChange");
        this.user = user;
    }
     public setAppUser(){
         // listen to changes to localStorage
        this.clientAuthService.getCurrentUser().subscribe(user => {
            console.log("app setAppUser user changed " + JSON.stringify(user));
            this.appState.setUser(user);
        });       
     }
     public setTitle(newTitle?) {
        newTitle ? this.title = newTitle : this.title = this.configService.get('title');
        this.titleService.setTitle(this.title);
    }
    registerBroadcast() {
        this.userEvent.on()
        .subscribe(message => {
            switch (message) {
            case "USER_LOGON":
                // received message the user logged on
                // need to set state to that user
                console.log("app recieved USER_LOGON broadcast");
                this.setAppUser();
                return;
            case "USER_CLEAR":
                // received message the user logged out
                // need to set state to that user
                //this.store.dispatch({type: UserActions.USER_CLEAR, payload: undefined});
                console.log("app recieved USER_CLEAR broadcast");
                this.appState.clearUser();
                return;

            }
        });
    }
}



