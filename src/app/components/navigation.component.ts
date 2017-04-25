import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { AppState, UserActions } from '../app.state';

import { User } from '../user/user.model';

import { AuthenticationService } from '../user/auth.service';
import { UserEvent } from '../user/user.broadcaster';

@Component({
  selector: 'navigation',
  template: `

        <div class="row">
          <div class="col-md-3">
            <span *ngIf="!currentUser.isAuthenticated"><a routerLink="/login" routerLinkActive="active">Login</a></span>
            <span *ngIf="currentUser.isAuthenticated"><a routerLink="/profile" routerLinkActive="active">{{ currentUser.email }}</a> | <a routerLink="/profile" [queryParams]="{logout: 'true'}" routerLinkActive="active">Logout</a></span>
          </div>
          <div class="col-md-2">
            <span *ngIf="!currentUser.isAuthenticated"> <a routerLink="/register" routerLinkActive="active">Register</a></span>
            <span *ngIf="currentUser.isAuthenticated"> <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></span>
          </div>           
        </div>
       

  `
})
export class NavigationComponent {

  currentUser:User = new User();

  constructor(
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private userEvent: UserEvent
  ){}

  ngOnInit(){
    // get out of state
    this.registerBroadcast();
    this.store.select(state => state.user)
      .distinctUntilChanged()
      .subscribe(user => this.onUserChange(user));
  }

  public onUserChange(user:User){
    this.currentUser = user;
  }

  registerBroadcast() {
    this.userEvent.on()
      .subscribe(message => {
         switch (message) {
          case "USER_LOGON":
            // received message the user logged on
            // need to set state to that user
            this.store.dispatch({type: UserActions.USER_LOGIN, payload: this.authService.getCurrentUser()});
            return;
          case "USER_CLEAR":
            // received message the user logged on
            // need to set state to that user
            this.store.dispatch({type: UserActions.USER_CLEAR, payload: undefined});
            return;

         }
      });
  }
}