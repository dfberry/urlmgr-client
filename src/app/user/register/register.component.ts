import { Component, KeyValueDiffers, DoCheck} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Configuration } from '../config';
import { AuthenticationHttpService } from '../services';



@Component({
    selector: 'register',
    template: ` 
      <div class="col-md-6">
          <h2>Register</h2>

          <form name="registerForm" (ngSubmit)="register()" >
                <div id="registrationerrorcontainer" type="registrationerrorcontainer" *ngIf="registration.error" class="form-group has-error">
                    <label id="registrationerrors" type="registrationerrors" class="control-label" >{{registration.error}}</label>
                </div>
              <div class="form-group" >
                  <label for="firstName">First Name</label>
                  <input id="firstname" type="firstname" class="form-control" [(ngModel)]="registration.user.firstName" name="firstname" placeholder="Your first name here"   />
              </div>
              
              <div class="form-group" >
                  <label for="lastName">Last Name</label>
                  <input type="lastname" class="form-control" [(ngModel)]="registration.user.lastName" name="lastname" placeholder="Your last name here"   />
              </div>
              <div class="form-group user" >
                  <label for="user">user</label>
                  <input type="text" type="email" class="form-control" [(ngModel)]="registration.user.email.value" name="email" placeholder="Your email here" required  (blur)="validateEmail()"/>
                  <div id="emailerrorcontainer" type="emailerrorcontainer" *ngIf="!registration.user.email.valid" class="email form-group has-error">
                    <label id="emailerrors" type="emailerrors" class="email errors control-label" >{{registration.user.email.errorMsg}}</label>
                  </div>
              </div>
              <div class="form-group" >
                  <label for="password">Password</label>
                  <input type="password"  class="form-control" [(ngModel)]="registration.user.password.value" name="password" placeholder="Your password here" (blur)="validatePassword()" />
                  <div id="passworderrorcontainer" type="passworderrorcontainer" *ngIf="!registration.user.password.valid" class="password form-group has-error">
                    <label id="passworderrors" type="passworderrors" class="password errors control-label" >{{registration.user.password.errorMsg}}</label>
                  </div>
              </div>
              <div class="form-group">
                  <button id="registerButton" type="submit" [disabled]="!registration.valid" class="btn btn-primary" >Register</button>
                  <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              </div>

          </form>
      </div>
    `
})
export class RegisterComponent implements DoCheck {
    config: any;
    newForm: FormGroup;

    registration = {
        error: "",
        valid: false,
        loading: false,
        registered: false,
        response: {},
        user:{
            lastName: "",
            firstName: "",
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


  emailDiffer: any;
  passwordDiffer: any;

    constructor(
        public authHttpService: AuthenticationHttpService /* for server auth */,
        private router: Router,
        private differs: KeyValueDiffers 
    ){
        console.log("registerComponent ctor");

        /* only differ on basic json object - NOT a nested object - so treat email and password as separate differs */
        this.emailDiffer = differs.find(this.registration.user.email).create();
        this.passwordDiffer = differs.find(this.registration.user.password).create();
    }
    ngOnInit() {  
        console.log("registerComponent ngOnInit");
        this.registration.loading = false;
     }
    ngDoCheck() {
        console.log("ngDoCheck called");
/*
 		var emailChanges = this.emailDiffer.diff(this.registration.user.email);
        var passwordChanges = this.passwordDiffer.diff(this.registration.user.password);

		if(emailChanges) {
			console.log('changes detected');

			emailChanges.forEachChangedItem(r => {
                console.log(r.key + ' changed from ' + JSON.stringify(r.previousValue) + " to " +  JSON.stringify(r.currentValue));
                this.validateEmail();
            });
			emailChanges.forEachAddedItem(r => {
                console.log(r.key + ' added ' +  JSON.stringify(r.currentValue));
                this.validateEmail();
            });
			emailChanges.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
		} else {
			console.log('registration nothing changed');
		}       
    
		if(passwordChanges) {
			console.log('user changes detected');
			console.log(passwordChanges);
			
			passwordChanges.forEachChangedItem(r => {
			  console.log(r.key + ' changed from ' + r.previousValue + " to " +  r.currentValue);
              this.validatePassword();
			 });
			passwordChanges.forEachAddedItem(r => {
                console.log(r.key + ' added ' +  JSON.stringify(r.currentValue));
                this.validatePassword();
            });
			passwordChanges.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
		} else {
			console.log('user nothing changed');
		} 
*/
        this.checkRequiredFields();
    }
    checkRequiredFields(){

        if(this.registration.user.email.valid==1 && this.registration.user.password.valid==1){
            this.registration.valid = true;
        } else {
            this.registration.valid = false;
        }
    }
    validateEmail() {

        //this.registration.user.user.dirty = true;

        // pattern="\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b."
        //console.log("validateuserOnBlur, user = " + JSON.stringify(this.registration.user.user));
        this.registration.user.email.dirty = true;
        // RFC 2822 compliant regex
        if (this.registration.user.email.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            console.log("user is valid format");
            this.registration.user.email.valid = 1;
            this.registration.user.email.errorMsg = "";
        } else {
            this.registration.user.email.valid = 0;
            this.registration.user.email.errorMsg = "user is not valid format";
            console.log("user is not valid format");
        }
    }
    validatePassword() {
        this.registration.user.password.dirty = true;
        if (this.registration.user.password.value.length > 0) {
            console.log("password is valid length");
            this.registration.user.password.valid = 1;
            this.registration.user.password.errorMsg = "";
        } else {
            this.registration.user.password.valid = 0;
            this.registration.user.password.errorMsg = "password is required";
            console.log("password is not valid length");
        }
    }
    register() {
        //console.log("caller is " + arguments.callee.caller.toString());
        console.log("########################################register called#############################################");

        let registrationObj = {
            email: this.registration.user.email.value,
            password: this.registration.user.password.value,
            lastName: this.registration.user.lastName,
            firstName: this.registration.user.firstName
        };

        this.authHttpService.registerToServer(registrationObj, Configuration.urls.base + '/users' ).then(json => {
            console.log("registerToServer success");
            this.registration.error="";
            this.registration.registered=true;
            this.router.navigate(['/login']);
        }).catch((err: any) => {
            // don't go any where, just set error text
            //console.log("registration.component err " + err);
            console.log("register failure - " + err);
            this.registration.error = "An unexpected error occured";
            this.registration.registered=false;
            console.log("err._body" + JSON.stringify(err._body));

            // TODO: error is incorrectly returned as string in body instead of JSON
            if(err && err._body){

                let response = JSON.parse(err._body);
                if (response.error) this.registration.error = response.error;
            }
            //if(err && err._body && err._body.error){ 
            //    this.registration.error = err._body;
            //}

        });
    }

}