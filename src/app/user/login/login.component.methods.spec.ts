import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

// Load the implementations that should be tested
import { LoginComponent } from './login.component';
import { AuthenticationHttpService, AuthenticationService, UserEvent } from '../services';
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
  let authService: AuthenticationHttpService;
  let localStorageServiceStub: AuthenticationService;

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
        { provide: AuthenticationHttpService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: AuthenticationService, useClass: localStorageServiceClass }
      ],
      imports: [HttpModule, RouterTestingModule],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  // fakeAsync so I can use tick
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = fixture.debugElement.injector.get(AuthenticationHttpService);   
    routerService = fixture.debugElement.injector.get(Router);

    authServiceSpy = spyOn(authService, 'authenticateToServer')
          .and.returnValue(Promise.resolve(baseJsonResponse));
    expect(component.registration.registered).toBe(false);

    component.registration.user.email.value = "1@1.com",
    component.registration.user.password.value = "1@1.com";

    // register new user
    component.register();

  }));
  it('should define everything', () => {
    expect(authService).toBeDefined();
    expect(routerService).toBeDefined();
    expect(component.register).toBeDefined();
  });
  it('should call services from register', () => {
    expect(authServiceSpy).toHaveBeenCalled();
  });
  it('should wait for promise (async)', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => { // wait for async 
      fixture.detectChanges();        // update view

      // successfully registered user
      expect(component.registration.registered).toBe(true);
    });
  }));
  it('should wait for fake promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();        // update view

    // successfully registered user
    expect(component.registration.registered).toBe(true);
  }));
  it('should register after submission promise (done)', (done: any) => {
    fixture.detectChanges();

    // get the spy promise and wait for it to resolve
    authServiceSpy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges(); // update view 

      // successfully registered user
      expect(component.registration.registered).toBe(true);
      expect(component.registration.error).toBe("");
      done();
    });
  });
});
