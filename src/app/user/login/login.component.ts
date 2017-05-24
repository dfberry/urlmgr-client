import { Component, KeyValueDiffers, DoCheck} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute  } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Configuration } from '../config';
import { ServerAuthenticationService, ClientAuthenticationService, UserEvent } from '../services';
import { User } from '../index';


@Component({
    selector: 'login',
    template: ` 
      <div class="col-md-6">
          <h2>Login</h2>

          <form name="loginForm" (ngSubmit)="login()" >
                <div id="loginerrorcontainer" type="loginerrorcontainer" *ngIf="authentication.error" class="form-group has-error">
                    <label id="loginerrors" type="loginerrors" class="control-label" >{{authentication.error}}</label>
                </div>
              <div class="form-group user" >
                  <label for="user">User</label>
                  <input type="text" type="email" class="form-control" [(ngModel)]="authentication.user.email.value" name="email" placeholder="Your email here" required  (blur)="validateEmail()"/>
                  <div id="emailerrorcontainer" type="emailerrorcontainer" *ngIf="!authentication.user.email.valid" class="email form-group has-error">
                    <label id="emailerrors" type="emailerrors" class="email errors control-label" >{{authentication.user.email.errorMsg}}</label>
                  </div>
              </div>
              <div class="form-group" >
                  <label for="password">Password</label>
                  <input type="password"  class="form-control" [(ngModel)]="authentication.user.password.value" name="password" placeholder="Your password here" (blur)="validatePassword()" />
                  <div id="passworderrorcontainer" type="passworderrorcontainer" *ngIf="!authentication.user.password.valid" class="password form-group has-error">
                    <label id="passworderrors" type="passworderrors" class="password errors control-label" >{{authentication.user.password.errorMsg}}</label>
                  </div>
              </div>
              <div class="form-group">
                  <button id="loginButton" type="submit" [disabled]="!authentication.valid" class="btn btn-primary" >Login</button>
                  <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              </div>

          </form>
      </div>
    `
})
export class LoginComponent implements DoCheck {
    config: any;
    newForm: FormGroup;
    user: User;

    authentication = {
        error: "",
        valid: false,
        loading: false,
        authenticated: false,
        response: {},
        user:{
            password: {
                dirty: false,
                value:"",
                valid: -1,
                errorMsg: ""
            },
            email : {
                dirty: false,
                value: "",
                valid: -1,
                errorMsg: ""
            }
        }
    }

    constructor(
        public serverAuthService: ServerAuthenticationService, /* for server auth */
        private router: Router,
        private clientAuthService: ClientAuthenticationService, /* for client auth */
        private userEvent: UserEvent, /* for state events */ 
        private activatedRoute: ActivatedRoute
    ){

        this.activatedRoute.queryParams.subscribe( data => {
            //console.log('queryParams', data['logout']);
            if(data['logout']) {

                this.clientAuthService.getCurrentUser().subscribe(user => {
                    console.log("profile user  " + JSON.stringify(user));
                    this.user = user;
                    this.logout();
                });  
            }
        });
    }
    ngOnInit() {  
        console.log("loginComponent ngOnInit");
        this.authentication.loading = false;
     }
    ngDoCheck() {
        console.log("ngDoCheck called");
        this.checkRequiredFields();
    }
    checkRequiredFields(){

        if(this.authentication.user.email.valid==1 && this.authentication.user.password.valid==1){
            this.authentication.valid = true;
        } else {
            this.authentication.valid = false;
        }
    }
    validateEmail() {

        // pattern="\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b."
        //console.log("validateuserOnBlur, user = " + JSON.stringify(this.authentication.user.user));
        this.authentication.user.email.dirty = true;
        // RFC 2822 compliant regex
        if (this.authentication.user.email.value.length > 0) {
            console.log("user is valid format");
            this.authentication.user.email.valid = 1;
            this.authentication.user.email.errorMsg = "";
        } else {
            this.authentication.user.email.valid = 0;
            this.authentication.user.email.errorMsg = "user is not valid format";
            console.log("user is not valid format");
        }
    }
    validatePassword() {
        this.authentication.user.password.dirty = true;
        if (this.authentication.user.password.value.length > 0) {
            console.log("password is valid length");
            this.authentication.user.password.valid = 1;
            this.authentication.user.password.errorMsg = "";
        } else {
            this.authentication.user.password.valid = 0;
            this.authentication.user.password.errorMsg = "password is required";
            console.log("password is not valid length");
        }
    }
    login() {

        let loginObj = {
            email: this.authentication.user.email.value,
            password: this.authentication.user.password.value
        };

        this.serverAuthService.authenticateToServer(loginObj, Configuration.urls.base + "/auth" ).then(json => {
            
            console.log("authenticateToServer success");
            
            // local properties
            this.authentication.error="";
            this.authentication.authenticated=true;

            // local storage
            this.clientAuthService.setCurrentAuthenticatedUserFromJson(json.data);

            // set state
            this.userEvent.fire('USER_LOGON', json.data);

            // go to dashboard
            this.router.navigate(['/dashboard']);
        }).catch((err: any) => {
            // don't go any where, just set error text
            this.authentication.error = "An unexpected error occured";
            this.authentication.authenticated=false;
            console.log("err._body" + JSON.stringify(err._body));

            // TODO: error is incorrectly returned as string in body instead of JSON
            if(err && err._body){
                this.authentication.error = err._body;
            }
        });
    }
    logout() {

        if(this.user && this.user.id && this.user.isAuthenticated){
            let url = Configuration.urls.base + '/users/' + this.user.id + '/tokens';

            this.clientAuthService.removeCurrentUser();
            this.userEvent.fire('USER_CLEAR',this.user.id);

            // don't care about response so don't wait around
            this.serverAuthService.deAuthenticateToServer(this.user, url);
            this.user = new User();
            this.router.navigate(['/']);
        }
    }
    observableError(err){
        console.log("console.log observable error " + err);
    }

}