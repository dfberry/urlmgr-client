import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

// Load the implementations that should be tested
import { RegisterComponent } from './register.component';
import { AuthenticationHttpService } from './auth.http.service';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';

fdescribe(`Register Component Method`, () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let email;
  let firstName = "bob";
  let lastName = "jones";
  let password = "1234";
  let emailPost = ".bobjones@registertest.com";

  let baseJsonResponse={
    commit: "123456"
  };

  let routerStub;
  let routerService: Router;

  let authServiceSpy;
  let authServiceStub;
  let authService: AuthenticationHttpService;

  beforeEach(() => {

    routerStub = {
      navigate: {}
    };

    authServiceStub = {
      registerToServer: {}
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: AuthenticationHttpService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub }
      ],
      imports: [HttpModule, RouterTestingModule],
      declarations: [RegisterComponent],
    }).compileComponents();
  });

  // fakeAsync so I can use tick
  beforeEach(fakeAsync(() => {



    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    authService = fixture.debugElement.injector.get(AuthenticationHttpService);
    routerService = fixture.debugElement.injector.get(Router);

    authServiceSpy = spyOn(authService, 'registerToServer')
          .and.returnValue(Promise.resolve(baseJsonResponse));
  }));
  it('should define everything', () => {
    expect(authService).toBeDefined();
    expect(routerService).toBeDefined();
    expect(component.register).toBeDefined();
  });
  it('should call services from register', () => {
    component.register();
    expect(authServiceSpy).toHaveBeenCalled();

  });
  /*
  it(`should route when new user successfully registered on server`, ()=> {
    
    //let authService = TestBed.get(AuthenticationHttpService);

    let authSpy: jasmine.Spy;
    let routeSpy: jasmine.Spy;

    authSpy = spyOn(auth, 'authenticateToServer');

    component.email = email;
    component.password = password;
    component.lastName = lastName;
    component.firstName = firstName;

    expect(component.registered).toBe(false);

    component.register();

    expect(component.registered).toBe(true);
    expect(authSpy).toHaveBeenCalled();

  })));
  */
});
