import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

// Load the implementations that should be tested
import { ProfileComponent } from './profile.component';
import { AuthenticateWithServerService, AuthenticationService, UserEvent } from '../services';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';
import { User } from '../user.model';



import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

class MockActivatedRoute {
  queryParams = {
    subscribe: jasmine.createSpy('subscribe')
     .and
     .returnValue(Observable.of(<Params>{id: 1}))
  }
}

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
        mockUser.lastName = "testLastName";
        mockUser.firstName = "testFirstName";
        return mockUser;
      }
}


describe(`User Profile Component UX`, () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let debugElement: DebugElement;
  let form: DebugElement;

  let authServiceStub;

  let routerStub;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  let userEventStub = {
      fire:  function(){}
    };

  let clickSpy: jasmine.Spy;// = spyOn(submitEl, 'click');
  let logoutSpy: jasmine.Spy;// = spyOn(component, 'register').and.callThrough();

  let submitEl: HTMLTextAreaElement;

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
        { provide: ActivatedRoute, useClass: MockActivatedRoute},
        { provide: UserEvent, useValue: userEventStub },
        { provide: AuthenticateWithServerService, useValue: authServiceStub },
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
    debugElement = fixture.debugElement;

    submitEl = fixture.debugElement.query(By.css('button')).nativeElement;

    form = fixture.debugElement.query(By.css('form'));

    clickSpy = spyOn(submitEl, 'click');
    //loginSpy = spyOn(component, 'register').and.callThrough();
    logoutSpy = spyOn(component, 'logout');

    fixture.detectChanges();
    tick();
  }));


  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
    expect(debugElement).toBeDefined();

    expect(submitEl).toBeDefined();
    expect(submitEl.id="logout");
    expect(submitEl.disabled).toBeFalsy();

  });

  it('should logout with submit button', fakeAsync(() => {
    fixture.detectChanges();

    form.triggerEventHandler('submit', null);

    fixture.detectChanges();
    tick(1000);

    expect(logoutSpy).toHaveBeenCalled();

  }));
});
