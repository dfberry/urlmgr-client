import { Injectable, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/take';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { AppState } from './app.state';
//http://stackoverflow.com/questions/39849060/angular-2-router-v3-observable-guard-with-ngrx

function getState(store: Store<AppState>): AppState {
    let state: AppState;
    store.take(1).subscribe(s => state = s);
    console.log("getState store = " + JSON.stringify(state));
    return state;
}

// all authentication is kept in local storage - not state
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private store: Store<AppState>, ) { 
    }

  /* just needs to return true is allowed to route */
  canActivate():boolean {
    console.log("AuthGuard::canActivate");
    let state = getState(this.store);

    /* user is NOT allowed to that route */
    if (!state.user.isAuthenticated) {
      console.log("user is not authorized");
      this.router.navigate(['/login']);
      return false;
    }
    /* user is allowed to that route */
    console.log("user is authorized");
    return state.user.isAuthenticated;
  }
}