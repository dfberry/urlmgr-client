import { ViewChild, Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { fakeAsync, async, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, 
    ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { RouterModule, Routes, Router } from '@angular/router'; 

import { ProfileComponent } from './profile.component';
import { User } from '../user.model';
import { ClientAuthenticationService, UserEvent } from '../services';
import { Broadcaster } from '../../services';
import { Configuration } from '../config';



describe('Profile Component', () => { 
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let profileFixture: ComponentFixture<ProfileComponent>;
  let profileComponent: ProfileComponent;

  let authService:ClientAuthenticationService;   
  let routerService:Router;
  let userEvent:UserEvent;
  let broadcaster:Broadcaster;

  let newUser:User;
  let userEventSpy:any;


  @Component({
    selector: `host-component`,
    template: `<profile #child [user]="user" [serverError]="serverError"></profile>`
  })
  class TestHostComponent {
    @ViewChild('child')
    public componentUnderTestComponent: ProfileComponent;
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
      declarations: [ProfileComponent, TestHostComponent],
      providers: [
        { provide: ClientAuthenticationService, useClass: 
            class MockClientAuth{ 
              public name:String="MockClientAuth";
              getCurrentUser(){ 
                return Observable.of({})}}},
        { provide: Router, useValue: function(){}},
        { provide: UserEvent, useClass: class MockEvent{
          constructor(){console.log("MockEvent constructor");}
          public name:String = "MockEvent";
          fire(eventname, user){
            console.log("mock eventname " + eventname);
            console.log("mock user " + JSON.stringify(user));
          }
        }},
        { provide: Broadcaster, useValue: function(){}}
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    profileFixture = TestBed.createComponent(ProfileComponent);
    profileComponent = profileFixture.componentInstance;

    authService = profileFixture.debugElement.injector.get(ClientAuthenticationService);   
    routerService = profileFixture.debugElement.injector.get(Router);
    userEvent = profileFixture.debugElement.injector.get(UserEvent);
    broadcaster = profileFixture.debugElement.injector.get(Broadcaster);

    userEventSpy = spyOn(userEvent, 'fire');

    newUser = new User();
    newUser.firstName = "UT-1-first-2";
    newUser.lastName = 'UT-1-Last-2';

  });
  it('should define parent fixture and component', () => { 
    expect(testHostFixture).toBeDefined();
    expect(testHostComponent).toBeDefined();
    expect(testHostComponent).toBeTruthy();
  });
  it('should define DI ', () => {
    expect(authService).toBeDefined();
    expect(authService.name).toBe("MockClientAuth"); // crazy ivan
    expect(routerService).toBeDefined();
    expect(userEvent).toBeDefined();
    expect(broadcaster).toBeDefined();
  });
  it('should pass correct input', async(() =>{

      // set in parent component
      testHostComponent.setInput(newUser);

      testHostFixture.detectChanges();

      // check form in child component
      expect(testHostComponent.componentUnderTestComponent.getInput()).toBe(newUser);
      expect(testHostComponent.componentUnderTestComponent.formModel.controls['firstName'].value).toBe(newUser.firstName);
      expect(testHostComponent.componentUnderTestComponent.formModel.controls['lastName'].value).toBe(newUser.lastName);
  }));
  it('should broadcast save with data', async(() =>{

      testHostComponent.setInput(newUser);
      testHostFixture.detectChanges();

      // set in parent component
      testHostComponent.componentUnderTestComponent.save();
      testHostFixture.detectChanges();

      expect(userEventSpy).toHaveBeenCalledWith('USER_PROFILE_SAVE_REQUESTED', newUser);
      expect(testHostComponent.componentUnderTestComponent.getInput()).toBe(newUser);
      expect(testHostComponent.componentUnderTestComponent.formModel.controls['firstName'].value).toBe(newUser.firstName);
      expect(testHostComponent.componentUnderTestComponent.formModel.controls['lastName'].value).toBe(newUser.lastName);

  }));
});
