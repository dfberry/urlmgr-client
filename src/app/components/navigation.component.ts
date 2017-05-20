import { OnInit, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { RouterModule, Router, Routes, ActivatedRoute, Route, Event as NavigationStart } from '@angular/router';
import { AppState, UserActions } from '../app.state';

//https://toddmotto.com/dynamic-page-titles-angular-2-router-events
// https://plnkr.co/edit/LT8l5nia7Yig7MZroSdc?p=preview
import { UserEvent, User , ClientAuthenticationService} from '../user';

@Component({
  selector: 'navigation',
  template: `

        <div class="row">
          <div *ngIf="!currentUser.isAuthenticated" class="col-md-9">
            <a routerLink="/login" routerLinkActive="active">Login</a> | 
            <a routerLink="/register" routerLinkActive="active">Register</a> 
          </div>
          <div *ngIf="currentUser.isAuthenticated" class="col-md-9">
            <a routerLink="/profile" routerLinkActive="active">{{ currentUser.email }} Profile</a> |
            <a routerLink="/profile" [queryParams]="{logout: 'true'}" routerLinkActive="active">Logout</a> | 
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          </div>   
          {{currentRoute}}        
        </div>
       

  `
})
export class NavigationComponent implements OnInit{

  currentUser:User = new User();

  constructor(
    private store: Store<AppState>,
    private authService: ClientAuthenticationService,
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