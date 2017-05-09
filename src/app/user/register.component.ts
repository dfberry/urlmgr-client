import { Component, SimpleChange, SimpleChanges, DoCheck} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Configuration } from './config';
import { AuthenticationHttpService } from './auth.http.service';



@Component({
    selector: 'register',
    template: ` 
      <div class="col-md-6">
          <h2>Register</h2>

          <form name="registerForm" (ngSubmit)="register()" >
                <div *ngIf="regError" class="form-group has-error">
                    <label class="control-label" >{{regError}}</label>
                </div>
              <div class="form-group" >
                  <label for="firstName">First Name</label>
                  <input id="firstname" type="firstname" class="form-control" [(ngModel)]="firstName" name="firstname" placeholder="Your first name here"   />
              </div>
              
              <div class="form-group" >
                  <label for="lastName">Last Name</label>
                  <input type="lastname" class="form-control" [(ngModel)]="lastName" name="lastname" placeholder="Your last name here"   />
              </div>
              <div class="form-group email" >
                  <label for="email">Email</label>
                  <input type="text" type="email" class="form-control" [(ngModel)]="email.value" name="username" placeholder="Your email here" required (blur)="validateEmailOnBlur()" />
                  <div id="emailerrorcontainer" type="emailerrorcontainer" *ngIf="!email.valid" class="email form-group has-error">
                    <label id="emailerrors" type="emailerrors" class="email errors control-label" >{{email.errorMsg}}</label>
                  </div>
              </div>
              <div class="form-group" >
                  <label for="password">Password</label>
                  <input type="password" type="password"  class="form-control" [(ngModel)]="password" name="password" placeholder="Your password here"  />
              </div>
              <div class="form-group">
                  <button id="registerButton" type="submit" [disabled]="!formEnabled" class="btn btn-primary" >Register</button>
                  <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              </div>

          </form>
      </div>
      {{validForm}}
    `
})
export class RegisterComponent implements DoCheck {
    config: any;
    newForm: FormGroup;
    lastName="";
    firstName="";
    password="";
    baseUrl;
    public regError;
    loading=true;

    email = {
        value: "",
        valid: false,
        dirty: false,
        errorMsg: ""
    }

    registered=false;
    formEnabled=false;

    emailerrors="";


    constructor(
        public authHttpService: AuthenticationHttpService /* for server auth */,
        private router: Router
    ){
        console.log("registerComponent ctor");

    }
    ngOnInit() {  
        console.log("registerComponent ngOnInit");
        this.loading = false;
        this.checkRequiredFields("ngOnInit");
     }
    ngDoCheck() {
        console.log("ngDoCheck called");
        this.checkRequiredFields("ngDoCheck");
        
    }



    checkRequiredFields(callername){

        this.validateEmailOnBlur();

        if(this.email.valid && this.password){
            this.formEnabled = true;
        } else {
            this.formEnabled = false;
        }
        console.log(callername + " called checkRequiredFields, formEnabled=" + this.formEnabled);
        console.log(callername + " called checkRequiredFields, this.firstName=" + this.firstName);
        console.log(callername + " called checkRequiredFields, this.lastName=" + this.lastName);
        console.log(callername + " called checkRequiredFields, this.email=" + JSON.stringify(this.email));
        console.log(callername + " called checkRequiredFields, this.password=" + this.password);    
    }
    validateEmailOnBlur() {

        this.email.dirty = true;

        // pattern="\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b."
        console.log("validateEmailOnBlur, email = " + JSON.stringify(this.email));

        // RFC 2822 compliant regex
        if (this.email.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            console.log("email is valid format");
            this.email.valid = true;
            this.email.errorMsg = "";
        } else {
            this.email.valid = false;
            this.email.errorMsg = "Email is not valid format";
            console.log("email is not valid format");
        }
    }
    register() {
        //console.log("caller is " + arguments.callee.caller.toString());
        console.log("########################################register called#############################################");
        this.registered = true;

        let registrationObj = {
            email: this.email.value,
            password: this.password,
            lastName: this.lastName,
            firstName: this.firstName
        };

        this.authHttpService.registerToServer(registrationObj, Configuration.urls.base + '/users' ).then(json => {
            console.log("register success");
            this.regError="";
            this.registered=true;
            this.router.navigate(['/login']);
        }).catch((err: any) => {
            // don't go any where, just set error text
            //console.log("registration.component err " + err);
            console.log("register failure - " + err);
            this.regError = "An unexpected error occured";
            if(err && err._body) this.regError = JSON.parse(err._body).error;

        });
    }

}