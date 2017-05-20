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
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';
import { User } from '../user.model';

class localStorageServiceClass  {
      setCurrentAuthenticatedUserFromJson(){};
      setCurrentUser(){};
      currentUser:Observable<User>;
}

describe(`User Login Component Method`, () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let email;
  let password = "1234";
  let emailPost = ".bobjones@registertest.com";

  let baseJsonResponse={
    commit: "123456"
  };

  let routerStub;
  let routerService: Router;
  let userEventStub;
  let authServiceSpy;
  let authServiceStub;
  let authService: ServerAuthenticationService;
  let localStorageServiceStub: ClientAuthenticationService;

  beforeEach(() => {

    routerStub = {
      navigate: function(){}
    };

    authServiceStub = {
      registerToServer: {},
      authenticateToServer:{}
    };

    userEventStub = {
      fire:  function(){}
    };


    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserEvent, useValue: userEventStub },
        { provide: ServerAuthenticationService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ClientAuthenticationService, useClass: localStorageServiceClass }
      ],
      imports: [HttpModule, RouterTestingModule],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  // fakeAsync so I can use tick
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = fixture.debugElement.injector.get(ServerAuthenticationService);   
    routerService = fixture.debugElement.injector.get(Router);

    authServiceSpy = spyOn(authService, 'authenticateToServer')
          .and.returnValue(Promise.resolve(baseJsonResponse));
    expect(component.authentication.authenticated).toBe(false);

    component.authentication.user.email.value = "1@1.com",
    component.authentication.user.password.value = "1@1.com";

    // login user
    component.login();

  }));
  it('should define everything', () => {
    expect(authService).toBeDefined();
    expect(routerService).toBeDefined();
    expect(component.login).toBeDefined();
  });
  it('should call services from login', () => {
    expect(authServiceSpy).toHaveBeenCalled();
  });
  it('should wait for promise (async)', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => { // wait for async 
      fixture.detectChanges();        // update view

      // successfully authenticated user
      expect(component.authentication.authenticated).toBe(true);
    });
  }));
  it('should wait for fake promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();        // update view

    // successfully authenticated user
    expect(component.authentication.authenticated).toBe(true);
  }));
  it('should login after submission promise (done)', (done: any) => {
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
