import { Component} from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { ClientAuthenticationService } from '../services';
import { User } from '../index';

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
        </div>
   </form>
</div>
    `
})
export class ProfileComponent {

    user: User = new User();
    baseUrl;

    constructor(
        private clientAuthService: ClientAuthenticationService
    ){}

    ngOnInit() {  
        console.log("ngOnInit");

        this.clientAuthService.getCurrentUser().subscribe(user => {
            console.log("profile user  " + JSON.stringify(user));
            this.user = user;
        });  
     }
}