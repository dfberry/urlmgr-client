import { OnInit, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl} from '@angular/forms';

import { RouterModule, Router, Routes, ActivatedRoute, Route, Event as NavigationStart } from '@angular/router';

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
            <a routerLink="/login" [queryParams]="{logout: 'true'}" routerLinkActive="active">Logout</a> | 
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          </div>   
          {{currentRoute}}        
        </div>
       

  `
})
export class NavigationComponent {

  @Input() user: User;

  constructor(){}
}