import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';
import {  } from '@angular/router'; 


// Load the implementations that should be tested
import { ProfileComponent } from './profile.component';
import { AuthenticationHttpService, AuthenticationService, UserEvent } from '../services';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';
import { User } from '../user.model';



class localStorageServiceClass  {
      setCurrentAuthenticatedUserFromJson(){};
      setCurrentUser(){};
      currentUser:Observable<User>;
      removeCurrentUser(){};
      getCurrentUser(){
        let mockUser = new User();
        mockUser.id = '111';
        mockUser.email = 'profileLogout@test.com';
        mockUser.isAuthenticated = true;
        mockUser.token = "ABCDEF";
      }
}



describe(`User Profile Component Method`, () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let email;
  let password = "1234";
  let emailPost = ".bobjones@rprofiletest.com";

  let baseJsonResponse={
    commit: "123456"
  };

  let routerSpy;
  let routerStub;
  let routerService: Router;

  let userEventStub;
  let authServiceSpy;
  let authServiceStub;
  let authService: AuthenticationHttpService;

  let localStorageServiceSpy;
  let localStorageService: AuthenticationService;

  beforeEach(() => {

    routerStub = {
      navigate: function(){}
    };

    authServiceStub = {
      registerToServer: {},
      authenticateToServer:{},
      deAuthenticateToServer: {}
    };

    userEventStub = {
      fire:  function(){}
    };


    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'logout': true }]) } },
        { provide: UserEvent, useValue: userEventStub },
        { provide: AuthenticationHttpService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: AuthenticationService, useClass: localStorageServiceClass }
      ],
      imports: [HttpModule, RouterTestingModule],
      declarations: [ProfileComponent],
    }).compileComponents();
  });

  // fakeAsync so I can use tick
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    authService = fixture.debugElement.injector.get(AuthenticationHttpService);   
    routerService = fixture.debugElement.injector.get(Router);
    localStorageService = fixture.debugElement.injector.get(AuthenticationService);

    authServiceSpy = spyOn(authService, 'deAuthenticateToServer')
          .and.returnValue(Promise.resolve()); //returns empty promise

    localStorageServiceSpy = spyOn(localStorageService, 'removeCurrentUser' );

    routerSpy = spyOn(routerService,'navigate');

    // login user
    component.logout();

  }));
  it('should define everything', () => {
    expect(authService).toBeDefined();
    expect(routerService).toBeDefined();
    expect(component.logout).toBeDefined();
  });
  it('should call services from logout', () => {
    expect(authServiceSpy).toHaveBeenCalled();
    expect(localStorageServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });
  it('should set user property to empty json', () => {
    expect(component.user).toEqual({});
  });

  
});
