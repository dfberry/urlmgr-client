import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

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

import { Observable } from 'rxjs/Rx';
import { MockActivatedRoute, newEvent, MockLocalStorage, MockRouter, MockUserEvent, MockServerAuthenticationService} from '../../utils/mocks';

describe(`User Login Component UX`, () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let debugElement: DebugElement;
  let form: DebugElement;

  let email;
  let password = "1234";
  let emailPost = ".bobjones@registertest.com";

  let clickSpy: jasmine.Spy;// = spyOn(submitEl, 'click');
  let loginSpy: jasmine.Spy;// = spyOn(component, 'register').and.callThrough();

  let submitEl: HTMLTextAreaElement;
  let loginEl: HTMLTextAreaElement;

  let emailErrorsContainerEl: HTMLTextAreaElement;
  let emailErrorsEl: HTMLTextAreaElement;
  
  let passwordEl: HTMLTextAreaElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        BaseRequestOptions,
        Location,
        { provide: ActivatedRoute, useClass: MockActivatedRoute},
        { provide: UserEvent, useClass: MockUserEvent },
        { provide: ServerAuthenticationService, useClass: MockServerAuthenticationService },
        { provide: Router, useClass: MockRouter },
        { provide: ClientAuthenticationService, useClass: MockLocalStorage }
      ],
      imports: [HttpModule, RouterTestingModule, FormsModule],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  // fakeAsync so I can use tick
  beforeEach(fakeAsync(() => {

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    submitEl = fixture.debugElement.query(By.css('button')).nativeElement;
    loginEl = fixture.debugElement.query(By.css('input[type=email]')).nativeElement;
    passwordEl = fixture.debugElement.query(By.css('input[type=password]')).nativeElement;

    form = fixture.debugElement.query(By.css('form'));

    clickSpy = spyOn(submitEl, 'click');
    //loginSpy = spyOn(component, 'register').and.callThrough();
    loginSpy = spyOn(component, 'login');

    fixture.detectChanges();
    tick();
  }));


  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
    expect(debugElement).toBeDefined();

    expect(submitEl).toBeDefined();

    expect(loginEl).toBeDefined();
    expect(passwordEl).toBeDefined();

  });

  it('should not have error objects in DOM on startup', fakeAsync(() => {

    expect(fixture.debugElement.query(By.css('div[type=loginerrorcontainer]'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('label[type=loginerrors'))).toBeDefined();

    expect(fixture.debugElement.query(By.css('div[type=emailerrorcontainer]'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('label[type=emailerrors'))).toBeDefined();

    expect(fixture.debugElement.query(By.css('div[type=passworderrorcontainer]'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('label[type=passworderrors'))).toBeDefined();

  }));

  it('should not enabled submit button on startup', fakeAsync(() => {

    expect(submitEl.disabled).toBeTruthy();
    
  }));

  it('should login with submit button', fakeAsync(() => {

    expect(loginEl.value).toBe('');

    expect(passwordEl.value).toBe('');
    expect(submitEl.disabled).toBeTruthy();

    fixture.detectChanges();

    email = Math.floor(new Date().valueOf() / 1000) + emailPost;

    loginEl.value = email;
    loginEl.dispatchEvent(new Event('input'));

    passwordEl.value = password;
    passwordEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    loginEl.dispatchEvent(new Event('blur'));
    passwordEl.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    tick();

    expect(loginEl.value).toBe(email);
    expect(component.authentication.user.email.valid).toBe(1);
    expect(component.authentication.user.email.dirty).toBe(true);
    expect(component.authentication.user.email.errorMsg).toBe('');
    expect(component.authentication.user.email.value).toBe(email);

    expect(passwordEl.value).toBe(password);
    expect(component.authentication.user.password.valid).toBe(1);
    expect(component.authentication.user.password.dirty).toBe(true);
    expect(component.authentication.user.password.errorMsg).toBe('');
    expect(component.authentication.user.password.value).toBe(password);

    expect(submitEl.disabled).toBeFalsy();
    expect(submitEl.id).toBe("loginButton");

    form.triggerEventHandler('submit', null);

    fixture.detectChanges();
    tick(1000);

    expect(loginSpy).toHaveBeenCalled();

  }));
  xit('should show invalid email error', fakeAsync(() => {

    expect(loginEl.value).toBe('');

    expect(passwordEl.value).toBe('');
    console.log("submit should be enabled");
    expect(submitEl.disabled).toBeTruthy();

    fixture.detectChanges();

    email = "thisisabademail";

    loginEl.value = email;
    loginEl.dispatchEvent(new Event('input'));

    passwordEl.value = password;
    passwordEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    loginEl.dispatchEvent(new Event('blur'));
    passwordEl.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    tick();

    expect(passwordEl.value).toBe(password);
    expect(component.authentication.user.password.value).toBe(password);

    expect(loginEl.value).toBe(email);
    expect(component.authentication.user.email.value).toBe(email);

    // assert for invalid error format

    emailErrorsContainerEl = fixture.debugElement.query(By.css('div[type=emailerrorcontainer]')).nativeElement;
    emailErrorsEl = fixture.debugElement.query(By.css('label[type=emailerrors')).nativeElement;

    // DOM changed
    expect(emailErrorsContainerEl).toBeDefined();
    expect(emailErrorsEl).toBeDefined();

    // HTML - container for email error should be visible
    expect(emailErrorsContainerEl.hasAttribute('hidden')).toEqual(false);
    // HTML - email label to have text
    expect(emailErrorsEl.innerHTML).not.toBe('');
    // HTML - submit button is disabled because of errors
    expect(submitEl.disabled).toBeTruthy();
    
    // component email error text is set
    expect(component.authentication.user.email.errorMsg).toBeTruthy();
    // component formEnabled
    expect(component.authentication.valid).toBeFalsy();
  }));  
xit('should allow correct email after invalid email error', fakeAsync(() => {
    expect(loginEl.value).toBe('');

    expect(passwordEl.value).toBe('');
    console.log("submit should be enabled");
    expect(submitEl.disabled).toBeTruthy();

    fixture.detectChanges();

    email = "thisisabademail";

    loginEl.value = email;
    loginEl.dispatchEvent(new Event('input'));

    passwordEl.value = password;
    passwordEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    loginEl.dispatchEvent(new Event('blur'));
    passwordEl.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    tick();

    expect(passwordEl.value).toBe(password);
    expect(component.authentication.user.password.value).toBe(password);

    expect(loginEl.value).toBe(email);
    expect(component.authentication.user.email.value).toBe(email);

    // assert for invalid error format

    emailErrorsContainerEl = fixture.debugElement.query(By.css('div[type=emailerrorcontainer]')).nativeElement;
    emailErrorsEl = fixture.debugElement.query(By.css('label[type=emailerrors')).nativeElement;

    // DOM changed
    expect(emailErrorsContainerEl).toBeDefined();
    expect(emailErrorsEl).toBeDefined();

    // HTML - container for email error should be visible
    expect(emailErrorsContainerEl.hasAttribute('hidden')).toEqual(false);
    // HTML - email label to have text
    expect(emailErrorsEl.innerHTML).not.toBe('');
    // HTML - submit button is disabled because of errors
    expect(submitEl.disabled).toBeTruthy();
    
    // component email error text is set
    expect(component.authentication.user.email.errorMsg).toBeTruthy();
    // component formEnabled
    expect(component.authentication.valid).toBeFalsy();

    // well-formed email
    email = Math.floor(new Date().valueOf() / 1000) + emailPost;
    loginEl.value = email;
    loginEl.dispatchEvent(new Event('input'));

    console.log("entered correct email and detecting changes");

    fixture.detectChanges();
    tick();

    loginEl.dispatchEvent(new Event('blur'));
    passwordEl.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    tick();

    expect(loginEl.value).toBe(email);
    expect(component.authentication.user.email.valid).toBe(1);
    expect(component.authentication.user.email.dirty).toBe(true);
    expect(component.authentication.user.email.errorMsg).toBe('');
    expect(component.authentication.user.email.value).toBe(email);
    
    console.log("checking submit");

    expect(submitEl.disabled).toBeFalsy();
    expect(submitEl.id).toBe("loginButton");

    form.triggerEventHandler('submit', null);


    fixture.detectChanges();
    tick(1000);

    expect(loginSpy).toHaveBeenCalled();
    
  }));  

});
