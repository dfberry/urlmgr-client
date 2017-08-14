import { Injectable, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/take';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { User } from './';
import { ClientAuthenticationService } from './services/client.authentication';

// all authentication is kept in local storage - not state
@Injectable()
export class UserAuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private clientAuthService: ClientAuthenticationService) { 
      }

  canActivate():boolean {
    if (!this.clientAuthService.authGuardIsUserAuthenticated) {
      console.log("user is not client-side authorized");
      this.router.navigate(['/login']);
      return false;
    }
    console.log("user is client-side authorized");
    return true;
  }
}