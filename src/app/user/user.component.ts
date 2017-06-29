import { Component, Input} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Broadcaster } from '../services';
import { User } from "./";
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router'; 
import { ClientAuthenticationService, UserEvent } from './services';


@Component({
    selector: 'user',
    template: ` 
        
        <register *ngIf="show=='registration'" [serverError]="serverError"></register>
        <login *ngIf="show=='login'" [user]="user" [serverError]="serverError"></login>
        <profile *ngIf="show=='profile'" [user]="user" [serverError]="serverError"></profile>
`
})
export class UserComponent {

    @Input() user: User;
    serverError: string="";

    show:String="login";

    constructor(
        private router: Router,
        private clientAuthService: ClientAuthenticationService, /* for client auth */
        private userEvent: UserEvent, /* for state events */ 
        private activatedRoute: ActivatedRoute,
        private broadcaster: Broadcaster
    ){
        if(activatedRoute && activatedRoute.snapshot) {
            this.parseActivatedRouteSnapshow(activatedRoute.snapshot);
        }

    }    
    ngOnInit() {
        this.clientAuthService.getCurrentUser().subscribe(user => {
            console.log("user  " + JSON.stringify(user));
            this.user = user;
        }); 

        this.registerBroadcastReceiver();
    }
    registerBroadcastReceiver() {
        let self = this;
        this.broadcaster.on<any>(MessageEvent)
        .subscribe(message => {

            console.log("user.component registerBroadcastReceiver message");
            console.log(message);

            if (!message || !message.event || !message.data) throw Error("malformed server message");
            switch (message.event) {
            case "USER_LOGON_RESPONSE_SUCCESS":
                console.log("user.component USER_LOGON_RESPONSE_SUCCESS");
                this.clientAuthService.setCurrentAuthenticatedUserFromJson(message.data);
                this.clientAuthService.getCurrentUser().subscribe(user => {
                    console.log("user  " + JSON.stringify(user));
                    this.user = user;
                }); 
                this.router.navigate(['/']);
                return;
            case "USER_LOGON_RESPONSE_FAILURE":
                console.log("user.component USER_LOGON_RESPONSE_FAILURE");
                console.log(message.data);
                this.serverError = message.data;
                this.show='login';
                return;
            case "USER_LOGOUT_RESPONSE_SUCCESS":
                console.log("user.component USER_LOGOUT_RESPONSE_SUCCESS");
                this.clientAuthService.removeCurrentUser();
                this.user = new User();
                this.router.navigate(['/']);
                return;
            case "USER_LOGOUT_RESPONSE_FAILURE":
                console.log("user.component USER_LOGOUT_RESPONSE_FAILURE");
                this.serverError = message.data;
                return;
            case "USER_REGISTRATION_RESPONSE_SUCCESS":
                console.log("user.component USER_REGISTRATION_RESPONSE_SUCCESS");
                this.router.navigate(['/login']);
                this.show='login';
                return;
            case "USER_REGISTRATION_RESPONSE_FAILURE":
                console.log("user.component USER_REGISTRATION_RESPONSE_FAILURE");
                this.serverError = message.data;
                this.show='registration';
                return;
            case "USER_PROFILE_SAVE_RESPONSE_SUCCESS":
                console.log("user.component USER_PROFILE_SAVE_RESPONSE_SUCCESS");
                this.serverError = message.data;
                this.show='profile';
                return;  
            case "USER_PROFILE_SAVE_RESPONSE_FAILURE":
                console.log("user.component USER_PROFILE_SAVE_RESPONSE_FAILURE");
                this.serverError = message.data;
                this.show='profile';
                return;               
            }
        });
    }
    parseActivatedRouteSnapshow(snapshot){

        if(snapshot && 
            snapshot.data && 
            snapshot.data[0] && 
            snapshot.data[0]["logout"]) {
                
                this.logout();

        } else if(snapshot && 
            snapshot.data && 
            snapshot.data[0] && 
            snapshot.data[0]["show"]) {
                
                this.show = snapshot.data[0]["show"];

        } else if (snapshot &&
            snapshot.url &&
            snapshot.url[0] &&
            snapshot.url[0].path){

                this.show = snapshot.url[0].path;

                if(this.show=="logout") this.logout();
        } else {
            this.show = "login";
        }
        console.log("show = " + this.show);
    }
    logout(){
        console.log("logout called");
        if(this.user && this.user.id ){   
            console.log("logout requested and user found");
            this.userEvent.fire('USER_LOGOUT_REQUESTED',this.user);
        } else {
            throw Error("logout requested but user not found");
        }
    }
}