import { Component} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'register',
    template: ` 
      <div class="col-md-6 col-md-offset-3">
          <h2>Register</h2>
          <form (submit)="register()">
              <div class="form-group" >
                  <label for="firstname">First Name</label>
                  <input type="text" class="form-control" [(ngModel)]="firstname" name="firstname" placeholder="Your first name here" required />
              </div>
              <div class="form-group" >
                  <label for="lastname">Last Name</label>
                  <input type="text"  class="form-control" [(ngModel)]="lastname" name="lastname" placeholder="Your last name here" required />
              </div>
              <div class="form-group" >
                  <label for="username">User</label>
                  <input type="text" class="form-control" [(ngModel)]="username" name="username" placeholder="Your email here" required />
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
    lastname="";
    firstname="";
    username="";
    password="";


    constructor(private http: Http){}

    ngOnInit() {  
     }

    register() {
      
      console.log("login function");
      console.log("username " + this.username);
      console.log("password " + this.password);
      console.log("lastname " + this.lastname);
      console.log("firstname " + this.firstname);

      let postForm = {
          email: this.username,
          password: this.password,
          lastname: this.lastname,
          firstname: this.firstname
      };

      console.log("postForm = " + JSON.stringify(postForm));

 /*       return this.http.post('http://urlmgrapi.dfberry.io/v1/auth', JSON.stringify({ username: this.username, password: this.password }))
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let user = response.json();
            console.log("user = " + user);
            console.log("user token = " + user.token);
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        }).catch(this._handleErrorObservable);
*/
        return this.http.post('http://urlmgrapi.dfberry.io/v1/users', postForm)
            .map((response:Response) => {
                console.log(response.json());
                return response.text();
            })
            .toPromise()
            .catch((err: any) => {
                console.log("http::data-getJsonPromise err " + err);
                return Promise.reject(err.message)
            });


    }
}