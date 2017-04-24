import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { AuthenticationService } from './user/auth.service';
import { User } from './user/user.model';
import { environment } from '../environments/environment';
import { ConfigService } from './config/config.service';
import { AppStore,AppState, UserActions, UserState } from './app.state';
import { StateService } from './state/index';

// components included in 
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation.component'

// use redux devtools in chrome instead
//<ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>

@Component({
    selector: 'app-root',
    template: ` 
    <div class="container">
        <navigation></navigation>
        <router-outlet></router-outlet>
    </div>
    `
})
export class AppComponent {
    public title: string = "";
    public user: User;

    constructor(
        private authService: AuthenticationService,     
        private configService: ConfigService,
        private state: StateService,
        private titleService: Title
        
    ){}

    ngOnInit() {
        console.log("AppComponent loaded"); 

        this.user = this.getCurrentUser();
        this.loadUserStateFromLocalStorage(this.user);
        this.setTitle(); 
     }
     public getCurrentUser(){
         return this.authService.getCurrentUser();
     }
     public loadUserStateFromLocalStorage(user:User){
        this.state.userLogon(user);
     }
     public setTitle(newTitle?) {
        newTitle ? this.title = newTitle : this.title = this.configService.get('title');
        this.titleService.setTitle(this.title);
    }
    
}



