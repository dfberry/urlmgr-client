import { OnInit, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl} from '@angular/forms';

import { RouterModule, Router, Routes, ActivatedRoute, Route, Event as NavigationStart } from '@angular/router';


//https://toddmotto.com/dynamic-page-titles-angular-2-router-events
// https://plnkr.co/edit/LT8l5nia7Yig7MZroSdc?p=preview
import { User} from '../user';

@Component({
  selector: 'navigation',
  template: `

        <div class="row">
          <div *ngIf="!user.isAuthenticated" class="col-md-9">
            <a routerLink="/login" routerLinkActive="active">Login</a> | 
            <a routerLink="/register" routerLinkActive="active">Register</a> 
          </div>
          <div *ngIf="user.isAuthenticated" class="col-md-9">
            <a routerLink="/profile" routerLinkActive="active">{{ user.email }} Profile</a> |
            <a routerLink="/profile" [queryParams]="{logout: 'true'}" routerLinkActive="active">Logout</a> | 
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          </div>   
          {{currentRoute}}        
        </div>
       

  `
})
export class NavigationComponent {

  @Input() user: User;

  constructor(){}

  ngOnInit(){
    console.log("user = " + JSON.stringify(this.user));
  }
  ngOnChanges(changes: SimpleChanges) {
    
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`Navigation::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
}