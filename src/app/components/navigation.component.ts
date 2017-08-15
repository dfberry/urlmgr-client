import { OnInit, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl} from '@angular/forms';

import { RouterModule, Router, Routes, ActivatedRoute, Route, Event as NavigationStart } from '@angular/router';

import { User} from '../user';

@Component({
  selector: 'navigation',
  template: `
        <div class="navigation row">
          <div *ngIf="!user.isAuthenticated" class="not-auth not-admin col-md-9">
            <a routerLink="/login" routerLinkActive="active">Login</a> | 
            <a routerLink="/register" routerLinkActive="active">Register</a> 
          </div>
          <div *ngIf="user.isAuthenticated" class="auth not-admin col-md-9">
            <a routerLink="/profile" routerLinkActive="active">{{ user.email }} Profile</a> |
            <a routerLink="/logout"  routerLinkActive="active">Logout</a> | 
            <a routerLink="/" routerLinkActive="active">Home</a>
            <div *ngIf="user.isAdmin" class="auth admin col-md-3">
            <!-- admin only navigation elements -->
            <div>
          </div>
                   
        </div>
       

  `
})
export class NavigationComponent {

  @Input() user: User;

  constructor(){
  
  }
  ngOnInit(){
    console.log("ngOnInit");
    console.log(this.user);
    console.log("ngOnInit .isAuthenticated = " + this.user.isAuthenticated);
    console.log("ngOnInit .isAdmin = " + this.user.isAdmin);
  }
  ngOnChanges(changes: SimpleChanges) {

    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`NavigationComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
    console.log("ngOnInit .isAuthenticated = " + this.user.isAuthenticated);
    console.log("ngOnInit .isAdmin = " + this.user.isAdmin);
  }
  getUser(){
    console.log("getUser");
    console.log(this.user);
    console.log("ngOnInit .isAuthenticated = " + this.user.isAuthenticated);
    console.log("ngOnInit .isAdmin = " + this.user.isAdmin);
    return this.user;
  }
}