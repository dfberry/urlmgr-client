import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppState } from './app.state';
import { AuthGuard } from './app.routing.authguard';
import { ClientAuthenticationService } from './user/services/client.authentication';

import { MockAppState, MockLocalStorage, userIsNotAuthenticated, userIsAuthenticated } from './utils/mocks';

describe('AuthGuardService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        ClientAuthenticationService,
        { provide: localStorage, useClass: MockLocalStorage },
        { provide: AppState, useClass: MockAppState},
      ],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  describe('authorized', () => {
    it('checks if an authenticated user has access to validated route',
      // inject your guard service AND Router
      async(inject([AuthGuard, Router, AppState], (authGuard, router, appState) => {

        spyOn(appState, "isAuthenticated").and.returnValue(true);
        spyOn(router, 'navigate');

        expect(authGuard.canActivate()).toBeTruthy();
        expect(appState.isAuthenticated).toHaveBeenCalled();
        expect(router.navigate).not.toHaveBeenCalled();
      })
    ));
  })
  describe('not authorized', () => {
    it('checks if an UNauthenticated user has access to validated route',
      // inject your guard service AND Router
      async(inject([AuthGuard, Router, AppState], (authGuard, router, appState) => {
        spyOn(appState, "isAuthenticated").and.returnValue(false);
        spyOn(router, 'navigate');

        expect(authGuard.canActivate()).toBeFalsy();
        expect(appState.isAuthenticated).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalled();
      })
    ));
  })
});