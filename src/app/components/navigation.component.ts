import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUrl, Url, ADD_URL, UrlService } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { AppState, UserStates } from '../app.state';
import { User } from '../user/user.model';

import { AuthenticationService } from '../user/auth.service';
import { UserEvent } from '../user/user.broadcaster';
/**************************************************************************
 * 
 * Show Feeds for Url
 * 
 * 
*/
@Component({
  selector: 'navigation',
  template: `
<div class="container" style="background-color:#00ccff">
    <div class="row">
        <div class="col-xs-11 col-sm-7">
            <div class="row">
                <div class="col-xs-5 col-sm-3">
                  <div *ngIf="!currentUser.isAuthenticated"><a routerLink="/login" routerLinkActive="active">Login</a></div>
                  <div *ngIf="currentUser.isAuthenticated"><a routerLink="/profile" routerLinkActive="active">{{ currentUser.email }} Profile</a> | <a routerLink="/logout" routerLinkActive="active">Logout</a></div>
                </div>
                <div class="col-xs-1 col-sm-1">
                    &nbsp;
                </div>
                <div class="col-xs-5 col-sm-3">
                  <div *ngIf="!currentUser.isAuthenticated"> <a routerLink="/register" routerLinkActive="active">Register</a></div>
                  <div *ngIf="currentUser.isAuthenticated"> <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></div>
                </div>           
              </div>
        </div>
</div>

  `
})
export class NavigationComponent {

  currentUser:User = new User();

  constructor(
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private userEvent:UserEvent
  ){}

  ngOnInit(){
    // get out of state
    console.log("navigation ngOnInit");
    this.registerBroadcast();
    this.store.select(state => state.user)
      .distinctUntilChanged()
      .subscribe(user => this.onUserChange(user));
  }

  public onUserChange(user:User){
    console.log("navigation onUserChange");
    this.currentUser = user;
  }

  registerBroadcast() {
    this.userEvent.on()
      .subscribe(message => {
        console.log("user broadcast event = " + JSON.stringify(message));

         switch (message) {
          case "USER_LOGON":
            // received message the user logged on
            // need to set state to that user
            this.store.dispatch({type: UserStates.USER_LOGIN, payload: this.authService.getCurrentUser()});
            return;
          case "USER_LOGOFF":
            // received message the user logged on
            // need to set state to that user
            this.store.dispatch({type: UserStates.USER_LOGOFF, payload: this.authService.getCurrentUser()});
            return;
          default:
             this.store.dispatch({type: UserStates.USER_CLEAR, payload: undefined});
             return;
         }
      });
  }
}