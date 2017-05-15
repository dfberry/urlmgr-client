import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Load the implementations that should be tested
import { LoginComponent } from './login.component';
import { AuthenticationHttpService, AuthenticationService, UserEvent } from '../services';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';

fdescribe(`User Login Component Method`, () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let password = "1@1.com";
  let email = "1@1.com";

  let baseJsonResponse={
    data: {
      token: "asdfasdf"
    },
    commit: "123456"
  };

  let routerStub;
  let routerService: Router;

  let authHttpServiceSpy;
  let authHttpServiceStub;
  let authHttpService: AuthenticationHttpService;
  
  let userEventStub;
  let authenticationServiceStub;

  beforeEach(() => {

    routerStub = {
      navigate: function(){}
    };

    //authenticationServiceStub = {
    //  authenticateToServer:  function(){}
    //};

    userEventStub = {
      fire:  function(){}
    };

    authenticationServiceStub = {
      setCurrentUser:  function(){}
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        UserEvent,
        AuthenticationService,
        AuthenticationHttpService,
        { provide: Router, useValue: routerStub },
        { provide: UserEvent, useValue: userEventStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ],
      imports: [HttpModule, RouterTestingModule],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  // fakeAsync so I can use tick
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    
    routerService = fixture.debugElement.injector.get(Router);

    authHttpService = fixture.debugElement.injector.get(AuthenticationHttpService);   
    authHttpServiceSpy = spyOn(authHttpService, 'authenticateToServer')
          .and.returnValue(Promise.resolve(baseJsonResponse));

    expect(component.authorized).toBe(false);

    component.email = "1@1.com";
    component.password ="1@1.com";

    // register new user
    component.login();

  }));
  it('should define everything', () => {
    expect(authHttpService).toBeDefined();
    expect(routerService).toBeDefined();
    expect(component.login).toBeDefined();
  });
  it('should call services from login', () => {
    expect(authHttpServiceSpy).toHaveBeenCalled();
  });
  it('should wait for promise (async)', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => { // wait for async 
      fixture.detectChanges();        // update view

      // successfully registered user
      expect(component.authorized).toBe(true);
    });
  }));
  it('should wait for fake promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();        // update view

    // successfully registered user
      expect(component.authorized).toBe(true);
  }));
  it('should register after submission promise (done)', (done: any) => {
    fixture.detectChanges();

    // get the spy promise and wait for it to resolve
    authHttpServiceSpy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges(); // update view 

      // successfully registered user
      expect(component.authorized).toBe(true);
      expect(component.authError).toBe("");
      done();
    });
  });
});
