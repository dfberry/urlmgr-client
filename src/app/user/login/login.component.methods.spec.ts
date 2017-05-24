import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

// Load the implementations that should be tested
import { LoginComponent } from './login.component';
import { ServerAuthenticationService, ClientAuthenticationService, UserEvent } from '../services';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';
import { User } from '../user.model';

import { MockRouter, MockUserEvent, MockLocalStorage, MockActivatedRoute, MockServerAuthenticationService } from '../../utils/mocks';

describe(`User Login Component Method`, () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let email;
  let password = "1234";
  let emailPost = ".bobjones@registertest.com";

  let baseJsonResponse={
    commit: "123456"
  };

  let routerService: Router;
  
  let userEventStub;
  
  let authServiceSpy;
  let mockServerAuthenticationService;

  let authService: ServerAuthenticationService;
  let localStorageServiceStub: ClientAuthenticationService;
  let mockLocalStorage;

  beforeEach(() => {

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute},
        { provide: UserEvent, useClass: MockUserEvent },
        { provide: ServerAuthenticationService, useClass: MockServerAuthenticationService },
        { provide: Router, useClass: MockRouter },
        { provide: ClientAuthenticationService, useClass: MockLocalStorage }
      ],
      imports: [HttpModule, RouterTestingModule],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  // fakeAsync so I can use tick
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    mockServerAuthenticationService = fixture.debugElement.injector.get(ServerAuthenticationService);   
    routerService = fixture.debugElement.injector.get(Router);
    mockLocalStorage = fixture.debugElement.injector.get(ClientAuthenticationService);

    authServiceSpy = spyOn(mockServerAuthenticationService, 'authenticateToServer')
          .and.returnValue(Promise.resolve(baseJsonResponse));
    expect(component.authentication.authenticated).toBe(false);

    component.authentication.user.email.value = "1@1.com",
    component.authentication.user.password.value = "1@1.com";

  }));
  it('should define everything', () => {
    expect(mockServerAuthenticationService).toBeDefined();
    expect(routerService).toBeDefined();
    expect(mockLocalStorage).toBeDefined();

    expect(component.login).toBeDefined();
    expect(component.logout).toBeDefined();
  });
  it('should call services from login', () => {
    component.login();
    expect(authServiceSpy).toHaveBeenCalled();
  });
  it('should call services from logout', () => {

    component.user = new User();
    component.user.id = '123';
    component.user.isAuthenticated = true;

    let serverAuthenticationService= spyOn(mockServerAuthenticationService, 'deAuthenticateToServer' )
      .and.returnValue(Promise.resolve({}));
    let localStorageSpy = spyOn(mockLocalStorage, 'removeCurrentUser' );
    let routerSpy = spyOn(routerService,'navigate');

    component.logout();

    expect(localStorageSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
    expect(serverAuthenticationService).toHaveBeenCalled();

    expect(component.user.id).toEqual('');
  });

  it('should wait for promise (async)', async(() => {
    component.login();
    fixture.detectChanges();
    fixture.whenStable().then(() => { // wait for async 
      fixture.detectChanges();        // update view

      // successfully authenticated user
      expect(component.authentication.authenticated).toBe(true);
    });
  }));
  it('should wait for fake promise (fakeAsync)', fakeAsync(() => {
    component.login();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();        // update view

    // successfully authenticated user
    expect(component.authentication.authenticated).toBe(true);
  }));
  it('should login after submission promise (done)', (done: any) => {
    component.login();
    fixture.detectChanges();

    // get the spy promise and wait for it to resolve
    authServiceSpy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges(); // update view 

      // successfully authenticated user
      expect(component.authentication.authenticated).toBe(true);
      expect(component.authentication.error).toBe("");
      done();
    });
  });
});
