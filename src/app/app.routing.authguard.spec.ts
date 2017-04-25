import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppState } from './app.state';
import { AuthGuard } from './app.routing.authguard';

import { MockAppState, userIsNotAuthenticated, userIsAuthenticated } from './utils/mocks';

describe('AuthGuardService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AppState, useClass: MockAppState },
      ],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });


  });

  it('checks if a invalid user has access to validated route',
    // inject your guard service AND Router
    async(inject([AuthGuard, Router, AppState], (auth, router, appState) => {

      // add a spy
      spyOn(router, 'navigate');

      expect(auth.canActivate()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalled();
    })
  ));

  it('checks if a valid user has access to validated route',
    // inject your guard service AND Router
    async(inject([AuthGuard, Router, AppState], (auth, router, appState) => {
      appState.u.isAuthenticated = true;
      // add a spy
      spyOn(router, 'navigate');

      expect(auth.canActivate()).toBeTruthy();
      expect(router.navigate).not.toHaveBeenCalled();
    })
  ));
});