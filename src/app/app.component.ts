import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from './user/auth.service';
import { User } from './user/user.model';
import { environment } from '../environments/environment';
import { ConfigService } from './config/config.service';

// components included in 
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation.component'

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
    //currentUser: User;
   // show: boolean = false;
    //public title: string = "";

    constructor(
        private authService: AuthenticationService,     
        private configService: ConfigService
        
    ){
        //this.show = environment.production ? true : false;
		//		console.log(process.env);
    }

    ngOnInit() {
        console.log("AppComponent loaded"); 

        //this.loadUserStateFromLocalStorage();
        //this.setTitle(); 
     }

     loadUserStateFromLocalStorage(){
        //this.appState.userLogon(this.authService.getCurrentUser());
     }
     public setTitle(newTitle?) {
        //newTitle ? this.title = newTitle : this.title = this.configService.get('title');
        //this.titleService.setTitle(this.title);
    }
    
}



