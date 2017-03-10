import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUrl, Url, AppState, ADD_URL, UrlService } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationService } from '../user/auth.service';
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
        <div class="col-xs-11 col-sm-6">
            <div class="row">
                <div class="col-xs-3 col-sm-2">
                  <div *ngIf="!isAuthenticated"><a routerLink="/login" routerLinkActive="active">Login</a></div>
                  <div *ngIf="isAuthenticated"><a routerLink="/profile" routerLinkActive="active">{{ currentUser.email }} Profile</a></div>
                </div>
                <div class="col-xs-1 col-sm-1">
                    &nbsp;
                </div>
                <div class="col-xs-3 col-sm-2">
                   <a routerLink="/register" routerLinkActive="active">Register</a>
                </div> 
                <div class="col-xs-1 col-sm-1">
                    &nbsp;
                </div>
                <div class="col-xs-3 col-sm-2">
                   <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
                </div>           
              </div>
        </div>
</div>

  `
})
export class NavigationComponent {

  currentUser={};
  isAuthenticated=false;

  constructor(
    private store: Store<AppState>,
    private authService: AuthenticationService
  ){}

  ngOnInit(){
    this.isAuthenticated = this.authService.isAuthenticated(); 
    if(this.isAuthenticated) this.currentUser = this.authService.getCurrentUser();

    console.log("currentUser = " + JSON.stringify(this.currentUser));
    console.log("isAuthenticated = " + this.isAuthenticated);
  }
}