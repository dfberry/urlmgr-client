import { Component} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router'; 
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserEvent } from './user.broadcaster';
import { AuthenticationService } from './auth.service';

@Component({
    selector: 'profile',
    template: ` 
      <div class="col-md-6 col-md-offset-3">
          <h2>Profile</h2>
          <form (submit)="logout()">
            <div>
                  <div>{{user.email}}</div>
                  <button [disabled]="loading" class="btn btn-primary">Logout</button>
            </div>
          </form>
      </div>
    `
})
export class ProfileComponent {

    user={};
    constructor(
        private http: Http,
        private authService: AuthenticationService,
        private userEvent: UserEvent,
        private router: Router
    ){}

    ngOnInit() {  

          this.user = this.authService.getCurrentUser();
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

        // remove user from local storage to log user out
        this.userEvent.fire('USER_CLEAR');
        this.authService.removeCurrentUser();
        this.user = {};

        return this.http.delete('http://urlmgrapi.dfberry.io/v1/users/' + postForm.user + '/tokens', options)
            .map((response:Response) => {
                // nothing returned but 200
                console.log("logout success "); 
                this.router.navigate(['/']);
                return;
            })
            .toPromise()
            .catch((err: any) => {
                console.log("logout err " + err);
                return Promise.reject(err.message)
            });
    }
}