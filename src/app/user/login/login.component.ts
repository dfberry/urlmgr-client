import { Component, KeyValueDiffers, DoCheck} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';

// user module only
import { User } from '../user.model';
import { AuthenticationHttpService, AuthenticationService, UserEvent } from '../services';
import { Configuration } from '../config'; // configuration inside user module only

@Component({
    selector: 'login',
    template: ` 
      <div class="col-md-6">
          <h2>Login</h2>

          <form (submit)="login()">
                  <div id="loginerrorcontainer" type="loginerrorcontainer"  *ngIf="authentication.error" class="form-group has-error">
                    <label id="loginerrors" type="loginerrors" class="control-label" >{{authentication.error}}</label>
                </div>            
              <div class="form-group" >
                  <label for="email">User</label>
                  <input type="email" type="text" class="form-control" [(ngModel)]="authentication.user.email.value" name="email" placeholder="Your email here" required />
              </div>
              <div class="form-group" >
                  <label for="password">Password</label>
                  <input type="password"  class="form-control" [(ngModel)]="authentication.user.password.value" name="password" placeholder="Your password here" required />
              </div>
              <div class="form-group">
                  <button id="loginButton" type="submit" [disabled]="loading" class="btn btn-primary">Login</button>
                  <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              </div>

          </form>
      </div>
    `
})
export class LoginComponent  implements DoCheck {
    config: any;
    newForm: FormGroup;

    authentication = {
        error: "",
        valid: false,
        loading: false,
        authorized: false,
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


    //email="";
    //password="";
    baseUrl;
    //authError="";
    //authorized=false;
    authenticatedUser:User;

    constructor(
        private authService: AuthenticationService, /* for client auth */
        private router: Router, /* go to Dashboard after successful auth */
        private userEvent: UserEvent, /* for state events */
        private authHttpService: AuthenticationHttpService /* for server auth */,
        private differs: KeyValueDiffers
        )
    {}

    ngOnInit() {  
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
        console.log("login checkRequiredFields " + this.authentication.valid);
    }
    login() {

        console.log("########################################login called#############################################");

        //console.log("login function");
        //console.log("email " + this.email);
        //console.log("password " + this.password);

        let authObj = {
            email: this.authentication.user.email.value,
            password: this.authentication.user.password.value
        };

        console.log(authObj);

        this.authHttpService.authenticateToServer(authObj, Configuration.urls.base + "/auth" ).then(json => {
        
                console.log("authenticateToServer success ");
                console.log(json);
                let user = json.data;

                // success should sent us to dashboard

                

                if (user && user.token) {
                    console.log("inside user");
                    this.authenticatedUser = new User();
                    this.authenticatedUser.transform(user);

                    this.authenticatedUser["isAuthenticated"]=true;
                    this.authentication.authorized = true;
                    console.log("authorized set to true");
                    this.authService.setCurrentUser(this.authenticatedUser);
                    this.userEvent.fire('USER_LOGON');
                    this.router.navigate(['/dashboard']);
                } else {
                    console.log("user not returned correctly");
                    console.log(user);
                }
            })
            .catch((err: any) => {
                // don't go any where, just set error text
                console.log("login failure - " + err);
                this.authentication.error = "An unexpected error occured";
                this.authentication.authorized=false;

                console.log("err._body" + err._body);
                if(err && err._body){

                    //let response = JSON.parse(err._body);
                    this.authentication.error = err._body;
                    console.log("this.authentication.error = " + this.authentication.error);
                }
            });
    }
 
}