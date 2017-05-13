import { Component} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserEvent, AuthenticationService } from '../services';

import { Configuration } from '../config';

@Component({
    selector: 'profile',
    template: ` 
<div >
   <h2>Profile</h2>
   <form (submit)="logout()">
      <div>

              <div class="form-group" >
                  <label for="firstname">First Name</label>
                  <input readonly type="text" class="form-control" value="{{user.firstName}}" />
              </div>
              <div class="form-group" >
                  <label for="lastname">Last Name</label>
                  <input readonly  type="text"  class="form-control" value="{{user.lastName}}" />
              </div>
              <div class="form-group" >
                  <label for="username">Email</label>
                  <input readonly  type="text" class="form-control" value="{{user.email}}" />
              </div>

              <div class="form-group" >
                  <label for="lastLogin">Last Login</label>
                  <input readonly type="text" class="form-control" value="{{user.lastLogin}}" />
              </div>

               <button [disabled]="loading" class="btn btn-primary">Logout</button>
        </div>
   </form>
</div>
    `
})
export class ProfileComponent {

    user={};
    baseUrl;

    constructor(
        private http: Http,
        private authService: AuthenticationService,
        private userEvent: UserEvent,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit() {  
        this.user = this.authService.getCurrentUser();

        // if ?logout=true, then logout
        this.activatedRoute.queryParams.subscribe( data => {
            //console.log('queryParams', data['logout']);
            if(data['logout']) this.logout();
        });
          
     }
 
    logout() {

        let postForm = {
            user: this.user['id'],
        };

        let headers = new Headers();
        headers.set('x-access-token', this.user['token']);

        let options:RequestOptionsArgs = {
            headers : headers,
            body : postForm
        };

        // remove user from ngrx storage
        this.userEvent.fire('USER_CLEAR');

        // remove user from local storage to log user out
        this.authService.removeCurrentUser();

        // clear local variable
        this.user = {};

        return this.http.delete(Configuration.urls.base + '/users/' + postForm.user + '/tokens', options)
            .map((response:Response) => {
                // nothing returned but 200
                //console.log("logout success "); 
                this.router.navigate(['/']);
                return;
            })
            .toPromise()
            .catch((err: any) => {
                //console.log("logout err " + err);
                return Promise.reject(err.message)
            });
    }
}