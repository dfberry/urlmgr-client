import { Component} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes,Router } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from './user.model';
import { UserEvent } from './user.broadcaster';
import { AuthenticationService } from './auth.service';
import { Configuration } from './config';

@Component({
    selector: 'login',
    template: ` 
      <div class="col-md-6">
          <h2>Login</h2>
          <form (submit)="login()">
              <div class="form-group" >
                  <label for="username">User</label>
                  <input type="text" class="form-control" [(ngModel)]="username" name="username" placeholder="Your email here" required />
              </div>
              <div class="form-group" >
                  <label for="password">Password</label>
                  <input type="password"  class="form-control" [(ngModel)]="password" name="password" placeholder="Your password here" required />
              </div>
              <div class="form-group">
                  <button [disabled]="loading" class="btn btn-primary">Login</button>
                  <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              </div>
          </form>
      </div>
    `
})
export class LoginComponent {
    config: any;
    newForm: FormGroup;
    username="";
    password="";


    constructor(
        private http: Http,
        private authService: AuthenticationService,
        private router: Router,
        private userEvent: UserEvent)
    {}

    ngOnInit() {  
     }

    login() {
      
        console.log("login function");
        console.log("username " + this.username);
        console.log("password " + this.password);

        let postForm = {
            email: this.username,
            password: this.password
        };

        console.log("postForm");

        return this.http.post(Configuration.urls.base + "/auth", postForm)
            .map((response:Response) => {
                console.log(response.json());
                let user = response.json();
                if (user && user.token) {

                    let authenticatedUser = new User();
                    authenticatedUser.transform(user);

                    authenticatedUser["isAuthenticated"]=true;

                    this.authService.setCurrentUser(authenticatedUser);
                    this.userEvent.fire('USER_LOGON');
                    this.router.navigate(['/dashboard']);
                }
            })
            .toPromise()
            .catch((err: any) => {
                console.log("http::data-getJsonPromise err " + err);
                return Promise.reject(err.message)
            });
    }
 
}