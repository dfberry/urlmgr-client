import { Injectable, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/take';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { AppState } from './app.state';
import { User } from './user/user.model';
import { ClientAuthenticationService } from './user/services/client.authentication';

// all authentication is kept in local storage - not state
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private clientAuthService: ClientAuthenticationService ) { 
      }

  canActivate():boolean {
    if (!this.clientAuthService.isAuthenticated()) {
      console.log("user is not authorized");
      this.router.navigate(['/login']);
      return false;
    }
    console.log("user is authorized");
    return true;
  }
}