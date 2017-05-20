import { Component} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router'; 
//import { Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserEvent, ClientAuthenticationService, ServerAuthenticationService } from '../services';

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

               <button id="logout" [disabled]="loading" class="btn btn-primary">Logout</button>
        </div>
   </form>
</div>
    `
})
export class ProfileComponent {

    user={};
    baseUrl;

    constructor(
        public authHttpService: ServerAuthenticationService,
        private authService: ClientAuthenticationService,
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

        let url = Configuration.urls.base + '/users/' + this.user['id'] + '/tokens';

        this.authHttpService.deAuthenticateToServer(this.user, url).then( results => {
            
            this.userEvent.fire('USER_CLEAR');
            this.authService.removeCurrentUser();
            this.user = {};
            this.router.navigate(['/']);
        }).catch(err => {
            console.log("logout failure - " + err);
        }); 

    }
}