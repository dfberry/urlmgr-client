import { Component} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Configuration } from './config';

@Component({
    selector: 'register',
    template: ` 
      <div class="col-md-6">
          <h2>Register</h2>
          <form (submit)="register()">
              <div class="form-group" >
                  <label for="firstName">First Name</label>
                  <input type="text" class="form-control" [(ngModel)]="firstName" name="firstname" placeholder="Your first name here" required />
              </div>
              <div class="form-group" >
                  <label for="lastName">Last Name</label>
                  <input type="text"  class="form-control" [(ngModel)]="lastName" name="lastname" placeholder="Your last name here" required />
              </div>
              <div class="form-group" >
                  <label for="email">Email</label>
                  <input type="text" class="form-control" [(ngModel)]="email" name="username" placeholder="Your email here" required />
              </div>
              <div class="form-group" >
                  <label for="password">Password</label>
                  <input type="password"  class="form-control" [(ngModel)]="password" name="password" placeholder="Your password here" required />
              </div>
              <div class="form-group">
                  <button [disabled]="loading" class="btn btn-primary">Register</button>
                  <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              </div>
          </form>
      </div>
    `
})
export class RegisterComponent {
    config: any;
    newForm: FormGroup;
    lastName="";
    firstName="";
    email="";
    password="";
    baseUrl;
    
    asyncErrors = {
        username: {
            error: false,
            message: "user is taken"
        }
    };

    constructor(
        private http: Http,
        private router: Router
    ){}

    ngOnInit() {  
     }

    register() {
      
      //console.log("login function");
      //console.log("email " + this.email);
      //console.log("password " + this.password);
      //console.log("lastName " + this.lastName);
      //console.log("firstName " + this.firstName);

      let postForm = {
          email: this.email,
          password: this.password,
          lastName: this.lastName,
          firstName: this.firstName
      };

      //console.log("postForm = " + JSON.stringify(postForm));

        return this.http.post(Configuration.urls.base + '/users', postForm)
            .map((response:Response) => {
                //console.log("register success " + response.json());
                this.router.navigate(['/login']);
            })
            .toPromise()
            .catch((err: any) => {
                // duplicate error
                if(err.status == 403) {
                    //console.log("duplicate email entered");
                    this.asyncErrors.username.error = true;
                    return Promise.reject("duplicate email entered");
                }
                //console.log("register error " + err);
                return Promise.reject(err.message)
            });


    }
}