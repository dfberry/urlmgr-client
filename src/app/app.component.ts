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
        private store: Store<AppState>,
        private appState: AppState,
        private titleService: Title,
        private userEvent: UserEvent,
        
    ){}

    ngOnInit() {
        console.log("AppComponent loaded"); 


        this.setTitle(); 

        // subscribe to any state change of user
        this.registerBroadcast();
        this.store.select(state => state.user)
        .distinctUntilChanged()
        .subscribe(user => this.onUserChange(user));


        // get localStorage User and set in state
        // if localStorage is empty, user is init'd but unauthorized
        this.appState.setUser(this.clientAuthService.getCurrentUser());
     }
     public setTitle(newTitle?) {
        newTitle ? this.title = newTitle : this.title = this.configService.get('title');
        this.titleService.setTitle(this.title);
    }
    public onUserChange(user:User){
        this.user = user;
    }
    registerBroadcast() {
        this.userEvent.on()
        .subscribe(message => {
            switch (message) {
            case "USER_LOGON":
                // received message the user logged on
                // need to set state to that user
                this.appState.setUser(this.clientAuthService.getCurrentUser());
                return;
            case "USER_CLEAR":
                // received message the user logged out
                // need to set state to that user
                //this.store.dispatch({type: UserActions.USER_CLEAR, payload: undefined});
                this.appState.clearUser();
                return;

            }
        });
    }
}



