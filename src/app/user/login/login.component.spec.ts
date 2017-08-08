import { ViewChild, Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { fakeAsync, async, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, 
    ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';
import { Location } from '@angular/common';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

// Load the implementations that should be tested
import { LoginComponent } from './login.component';
import { ClientAuthenticationService, UserEvent } from '../services';
import { User } from '../user.model';
import { Broadcaster } from '../../services';
import { MockRouter, MockUserEvent, MockLocalStorage, MockActivatedRoute, MockServerAuthenticationService } from '../../utils/mocks';

describe(`Login Component`, () => {

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let loginFixture: ComponentFixture<LoginComponent>;
  let loginComponent: LoginComponent;

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let email;
  let password = "1234";
  let emailPost = ".bobjones@registertest.com";

  let baseJsonResponse={
    commit: "123456"
  };

  let activatedRoute;
  let userEvent;
  let userEventSpy;
  let broadcaster;

  //let authService: ServerAuthenticationService;
  let localStorageServiceStub: ClientAuthenticationService;
  let mockLocalStorage;

  @Component({
    selector: `host-component`,
    template: `<login #child [user]="user" [serverError]="serverError"></login>`
  })
  class TestHostComponent {
    @ViewChild('child')
    public componentUnderTestComponent: LoginComponent;
    private user: User;

    setInput(newInput) {
      this.user = newInput;
    }
    getInput(){
      return this.user;
    }
  }

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute},
        { provide: UserEvent, useClass: class MockEvent{
          constructor(){console.log("MockEvent constructor");}
          public name:String = "MockEvent";
          fire(eventname, user){
            console.log("mock eventname " + eventname);
            console.log("mock user " + JSON.stringify(user));
          }
        }},
        { provide: Broadcaster, useValue: function(){}}
           
      
      ],
      declarations: [LoginComponent, TestHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    loginFixture = TestBed.createComponent(LoginComponent);
    loginComponent = loginFixture.componentInstance;

    activatedRoute = loginFixture.debugElement.injector.get(ActivatedRoute);
    userEvent = loginFixture.debugElement.injector.get(UserEvent);
    broadcaster = loginFixture.debugElement.injector.get(Broadcaster);

    userEventSpy = spyOn(userEvent, 'fire');
    
    /*
    authService = loginFixture.debugElement.injector.get(ClientAuthenticationService);   
    routerService = profileFixture.debugElement.injector.get(Router);
    userEvent = profileFixture.debugElement.injector.get(UserEvent);
    broadcaster = profileFixture.debugElement.injector.get(Broadcaster);

    

    newUser = new User();
    newUser.firstName = "UT-1-first-2";
    newUser.lastName = 'UT-1-Last-2';
*/
  });

  // fakeAsync so I can use tick
/*
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    //mockServerAuthenticationService = fixture.debugElement.injector.get(ServerAuthenticationService);   
    routerService = fixture.debugElement.injector.get(Router);
    mockLocalStorage = fixture.debugElement.injector.get(ClientAuthenticationService);

    authServiceSpy = spyOn(mockServerAuthenticationService, 'authenticateToServer')
          .and.returnValue(Promise.resolve(baseJsonResponse));
    expect(component.authentication.authenticated).toBe(false);

    component.authentication.user.email.value = "1@1.com",
    component.authentication.user.password.value = "1@1.com";

  }));
  */
  it('should define parent fixture and component', () => {
    expect(testHostFixture).toBeDefined();
    expect(testHostComponent).toBeDefined();
    expect(testHostComponent).toBeTruthy();
  });
  it('should define DI ', () => {
    expect(activatedRoute).toBeDefined();
    expect(userEvent).toBeDefined();
    expect(broadcaster).toBeDefined();
  });
  it('should call services from login', async(() => {

    // login is after UX validation so even though 
    // no pwd is set, the login should call userEvent

    let newUser = new User();
    newUser.email = "fake@fake.com";
    newUser.id="fakeid";

    let password = 'fakePassword';

    loginComponent.formModel =  new FormGroup({
            'email': new FormControl(newUser.email), 
            'password': new FormControl(password)
        });
    testHostFixture.detectChanges();

    loginComponent.login();
    testHostFixture.detectChanges();

    expect(userEventSpy).toHaveBeenCalledWith('USER_LOGON_REQUESTED', 
      {'email':newUser.email, 'password': password });

  }));
  // this test doesn't test routing - that is fine for 
  // now but eventually need to cover that as well
  it('should call services from logout', () => {

    let newUser = new User();
    newUser.email = "fake@fake.com";
    newUser.id="fakeid";

    // set in parent component
    testHostComponent.setInput(newUser);
    testHostFixture.detectChanges();

    loginComponent.logout(newUser);
    testHostFixture.detectChanges();

    expect(userEventSpy).toHaveBeenCalledWith('USER_LOGOUT_REQUESTED', newUser);

  });

});
