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
              <div class="form-group" >
                  <label for="firstName">First Name</label>
                  <input id="firstname" type="firstname" class="form-control" [(ngModel)]="firstName" name="firstname" placeholder="Your first name here" />
              </div>
              <div class="form-group" >
                  <label for="lastName">Last Name</label>
                  <input type="lastname" class="form-control" [(ngModel)]="lastName" name="lastname" placeholder="Your last name here"  (blur)="someMethod()" />
              </div>
              <div class="form-group" >
                  <label for="email">Email</label>
                  <input type="text" type="email" class="form-control" [(ngModel)]="email" name="username" placeholder="Your email here" required (blur)="someMethod()" />
              </div>
              <div class="form-group" >
                  <label for="password">Password</label>
                  <input type="password" type="password"  class="form-control" [(ngModel)]="password" name="password" placeholder="Your password here" required (blur)="someMethod()" />
              </div>
              <div class="form-group">
                  <button id="registerButton" type="submit" [disabled]="!formEnabled" class="btn btn-primary" >Register</button>
                  <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              </div>
                <div *ngIf="regError" class="form-group has-error">
                    <label class="control-label" >{{regError}}</label>
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
    email="";
    password="";
    baseUrl;
    public regError;
    loading=true;
    registered=false;
    formEnabled=false;


    asyncErrors = {
        username: {
            error: false,
            message: "user is taken"
        }
    };

    constructor(
        public authHttpService: AuthenticationHttpService /* for server auth */,
        private router: Router
    ){
        console.log("registerComponent ctor");

    }

    checkRequiredFields(callername){

        if(this.email && this.password){
            this.formEnabled = true;
        } 
        console.log(callername + " called checkRequiredFields, formEnabled=" + this.formEnabled);
        console.log(callername + " called checkRequiredFields, this.firstName=" + this.firstName);
        console.log(callername + " called checkRequiredFields, this.lastName=" + this.lastName);
        console.log(callername + " called checkRequiredFields, this.email=" + this.email);
        console.log(callername + " called checkRequiredFields, this.password=" + this.password);    


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
    someMethod(){
        console.log("someMethod called");
        this.checkRequiredFields("someMethod");
    }
    firstNameBlur(){
        console.log("firstNameBlur called");
        this.checkRequiredFields("firstNameBlur");
    }
    register() {
        //console.log("caller is " + arguments.callee.caller.toString());
        console.log("########################################register called#############################################");
        this.registered = true;

        let registrationObj = {
            email: this.email,
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
            console.log("register failure");
            this.regError = err._body;
        });
    }
}