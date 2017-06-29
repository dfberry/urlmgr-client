import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';



// Load the implementations that should be tested
import { ProfileComponent } from './profile.component';
import { ClientAuthenticationService, UserEvent } from '../services';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';
import { User } from '../user.model';

import { MockLocalStorage } from '../../utils/mocks';

describe(`User Profile Component Method`, () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let email;
  let password = "1234";
  let emailPost = ".bobjones@rprofiletest.com";

  let baseJsonResponse={
    commit: "123456"
  };

  let localStorageService;
  let localStorageServiceSpy;

  beforeEach(() => {


    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        /*{ provide: ActivatedRoute, useClass: MockActivatedRoute},
        { provide: UserEvent, useValue: userEventStub },
        { provide: ServerAuthenticationService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
        */
        { provide: ClientAuthenticationService, useClass: MockLocalStorage }
      ],
      imports: [RouterTestingModule],
      declarations: [ProfileComponent],
    }).compileComponents();
  });

  // fakeAsync so I can use tick
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    //authService = fixture.debugElement.injector.get(ServerAuthenticationService);   
    //routerService = fixture.debugElement.injector.get(Router);
    localStorageService = fixture.debugElement.injector.get(ClientAuthenticationService);

    //authServiceSpy = spyOn(authService, 'deAuthenticateToServer')
    //      .and.returnValue(Promise.resolve()); //returns empty promise

    localStorageServiceSpy = spyOn(localStorageService, 'removeCurrentUser' );

    //routerSpy = spyOn(routerService,'navigate');

    component.user = new User();
    
    // TBD: fix to use valid token and user.isAuthenticated()
    //component.user.isAuthenticated = true;

    // login user
    //component.logout();

  }));
  it('should define everything', () => {
    expect(localStorageService).toBeDefined();
  });
  /*
  it('should call services from logout', () => {
    expect(authServiceSpy).toHaveBeenCalled();
    expect(localStorageServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });
  it('should set user property to new user', () => {
    expect(JSON.stringify(component.user)).toEqual(JSON.stringify(new User()));
  });
*/
  
});
