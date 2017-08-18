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
    <ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
        <navigation [user]="user"></navigation>
        <router-outlet ></router-outlet>
        
    </div>
    `
})
export class AppComponent implements OnInit {
    public title: string = "";
    user:User = new User();
    config: any;

    constructor(
        private clientAuthService: ClientAuthenticationService,     
        private configService: ConfigService,
        private appState: AppState,
        private titleService: Title,
        private userEvent: UserEvent
        
    ){
        localStorage.clear();
    }
    // when app begins, let's get user from client localStorage
    ngOnInit() {
        console.log("AppComponent loaded"); 

        this.setTitle(); 

        // subscribe to any state change of user
        this.registerUserModuleRequestToServerBroadcast();
        //this.registerServerResponseToUserModule();

        this.appState.getCurrentUser()
        .distinctUntilChanged()
        .subscribe(user => {
            this.onUserChange(user);
        });

        this.appState.logout(null);
     }
    public onUserChange(user:User){
        console.log("app onUserChange");
        this.user = user;
    }
     public setTitle(newTitle?) {
        newTitle ? this.title = newTitle : this.title = this.configService.get('title');
        this.titleService.setTitle(this.title);
    }
    /*
        Coming from User Module
    */
    registerUserModuleRequestToServerBroadcast() {
        this.userEvent.on()
        .subscribe(message => {

            console.log("registerUserModuleRequestToServerBroadcast message");
            console.log(message);

            if (!message || !message.event || !message.data) throw Error("malformed userEvent");
            switch (message.event) {
            case "USER_LOGON_REQUESTED":
                // received message the user logged on
                // need to set state to that user
                console.log("USER_LOGON_REQUESTED = " + JSON.stringify(message.data));
                this.appState.verifyCredentials(message.data);
                return;
            case "USER_LOGOUT_REQUESTED":
                // received message the user logged out
                // need to set state to that user
                //this.store.dispatch({type: UserActions.USER_LOGOUT, payload: undefined});
                console.log("USER_LOGOUT_REQUESTED");
                this.appState.logout(message.data);
                return;
            case "USER_REGISTRATION_REQUESTED":
                console.log("USER_REGISTRATION_REQUESTED");
                this.appState.register(message.data);
                return;
            case "USER_PROFILE_SAVE_REQUESTED":
                console.log("USER_PROFILE_SAVE_REQUESTED");
                this.appState.saveProfile(message.data);
                return;
            default:
                console.log()
            }
        });
    }
}



