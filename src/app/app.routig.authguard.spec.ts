//https://blog.realworldfullstack.io/real-world-angular-part-9-unit-testing-c62ba20b1d93

import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppState, UserState, UrlState } from './app.state';
import { AuthGuard } from './app.routing.authguard';

//import { MockAppState, userIsNotAuthenticated, userIsAuthenticated } from './utils/mocks';


fdescribe('AuthGuard', () => {
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ], 
      imports: [
        RouterTestingModule,
        StoreModule.provideStore({urls: UrlState, user: UserState}),
      ],
      providers: [AuthGuard, AppState],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

  }));
  it('checks if a unauthenticated user has access to dashboard',
    // inject your guard service AND Router
    async(inject([AuthGuard, Router, AppState], (auth, router, appState) => {

      // add a spy
      spyOn(router, 'navigate');

      expect(auth.canActivate()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalled();
    })
  ));
});