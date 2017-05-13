import { Injectable, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/take';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { AppState } from './app.state';
import { User } from './user/user.model';

// all authentication is kept in local storage - not state
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private appState: AppState ) { }

  /* just needs to return true is allowed to route */
  canActivate():boolean {

    let currentUser = this.appState.getCurrentUser();

    if (!currentUser.isAuthenticated) {

      console.log("user is not authorized");
      this.router.navigate(['/login']);
      return false;
    }
    /* user is allowed to that route */
    console.log("user is authorized");
    return currentUser.isAuthenticated;
  }
}