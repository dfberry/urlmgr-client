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

function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

describe(`Register UX`, () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let debugElement: DebugElement;
  let form: DebugElement;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  let email;
  let firstName = "bob";
  let lastName = "jones";
  let password = "1234";
  let emailPost = ".bobjones@registertest.com";

  let clickSpy: jasmine.Spy;// = spyOn(submitEl, 'click');
  let registerSpy: jasmine.Spy;// = spyOn(component, 'register').and.callThrough();

  let submitEl: HTMLTextAreaElement;
  let firstnameEl: HTMLTextAreaElement;
  let lastnameEl: HTMLTextAreaElement;
  let loginEl: HTMLTextAreaElement;

  let emailErrorsContainerEl: HTMLTextAreaElement;
  let emailErrorsEl: HTMLTextAreaElement;
  
  let passwordEl: HTMLTextAreaElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AuthenticationHttpService,
        BaseRequestOptions,
        Location,
        { provide: Router, useValue: mockRouter }
      ],
      imports: [HttpModule, RouterTestingModule, FormsModule],
      declarations: [RegisterComponent],
    }).compileComponents();
  });

  // fakeAsync so I can use tick
  beforeEach(fakeAsync(() => {

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    submitEl = fixture.debugElement.query(By.css('button')).nativeElement;
    firstnameEl = fixture.debugElement.query(By.css('input[type=firstname]')).nativeElement;
    lastnameEl = fixture.debugElement.query(By.css('input[type=lastname]')).nativeElement;
    loginEl = fixture.debugElement.query(By.css('input[type=email]')).nativeElement;
    passwordEl = fixture.debugElement.query(By.css('input[type=password]')).nativeElement;

    form = fixture.debugElement.query(By.css('form'));

    clickSpy = spyOn(submitEl, 'click');
    //registerSpy = spyOn(component, 'register').and.callThrough();
    registerSpy = spyOn(component, 'register');

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

    expect(firstnameEl).toBeDefined();
    expect(lastnameEl).toBeDefined();

  });

  it('should not have email error objects in DOM on startup', fakeAsync(() => {

    expect(fixture.debugElement.query(By.css('div[type=emailerrorcontainer]'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('label[type=emailerrors'))).toBeDefined();

  }))

  it('should register with submit button', fakeAsync(() => {

    expect(firstnameEl.value).toBe('');
    expect(lastnameEl.value).toBe('');

    expect(loginEl.value).toBe('');

    expect(passwordEl.value).toBe('');
    expect(submitEl.disabled).toBeTruthy();

    fixture.detectChanges();

    email = Math.floor(new Date().valueOf() / 1000) + emailPost;

    firstnameEl.value = firstName;
    firstnameEl.dispatchEvent(new Event('input'));

    lastnameEl.value = lastName;
    lastnameEl.dispatchEvent(new Event('input'));

    loginEl.value = email;
    loginEl.dispatchEvent(new Event('input'));

    passwordEl.value = password;
    passwordEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(firstnameEl.value).toBe(firstName);
    expect(component.firstName).toBe(firstName);

    expect(lastnameEl.value).toBe(lastName);
    expect(component.lastName).toBe(lastName);

    expect(loginEl.value).toBe(email);
    expect(component.email.valid).toBe(true);
    expect(component.email.dirty).toBe(true);
    expect(component.email.errorMsg).toBe('');
    expect(component.email.value).toBe(email);

    expect(passwordEl.value).toBe(password);
    expect(component.password).toBe(password);

    expect(submitEl.disabled).toBeFalsy();
    expect(submitEl.id).toBe("registerButton");

    form.triggerEventHandler('submit', null);


    fixture.detectChanges();
    tick(1000);

    expect(registerSpy).toHaveBeenCalled();

  }));
  it('should show invalid email error', fakeAsync(() => {

    expect(firstnameEl.value).toBe('');
    expect(lastnameEl.value).toBe('');

    expect(loginEl.value).toBe('');

    expect(passwordEl.value).toBe('');
    console.log("submit should be enabled");
    expect(submitEl.disabled).toBeTruthy();

    fixture.detectChanges();

    email = "thisisabademail";

    firstnameEl.value = firstName;
    firstnameEl.dispatchEvent(new Event('input'));

    lastnameEl.value = lastName;
    lastnameEl.dispatchEvent(new Event('input'));

    loginEl.value = email;
    loginEl.dispatchEvent(new Event('input'));

    passwordEl.value = password;
    passwordEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(firstnameEl.value).toBe(firstName);
    expect(component.firstName).toBe(firstName);

    expect(lastnameEl.value).toBe(lastName);
    expect(component.lastName).toBe(lastName);

    expect(passwordEl.value).toBe(password);
    expect(component.password).toBe(password);

    expect(loginEl.value).toBe(email);
    expect(component.email.value).toBe(email);

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
    expect(component.email.errorMsg).toBeTruthy();
    // component formEnabled
    expect(component.formEnabled).toBeFalsy();
  }));  
it('should allow correct email after invalid email error', fakeAsync(() => {

    expect(firstnameEl.value).toBe('');
    expect(lastnameEl.value).toBe('');

    expect(loginEl.value).toBe('');

    expect(passwordEl.value).toBe('');
    console.log("submit should be enabled");
    expect(submitEl.disabled).toBeTruthy();

    fixture.detectChanges();

    email = "thisisabademail";

    firstnameEl.value = firstName;
    firstnameEl.dispatchEvent(new Event('input'));

    lastnameEl.value = lastName;
    lastnameEl.dispatchEvent(new Event('input'));

    loginEl.value = email;
    loginEl.dispatchEvent(new Event('input'));

    passwordEl.value = password;
    passwordEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(firstnameEl.value).toBe(firstName);
    expect(component.firstName).toBe(firstName);

    expect(lastnameEl.value).toBe(lastName);
    expect(component.lastName).toBe(lastName);

    expect(passwordEl.value).toBe(password);
    expect(component.password).toBe(password);

    expect(loginEl.value).toBe(email);
    expect(component.email.value).toBe(email);

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
    expect(component.email.errorMsg).toBeTruthy();
    // component formEnabled
    expect(component.formEnabled).toBeFalsy();

    // well-formed email
    email = Math.floor(new Date().valueOf() / 1000) + emailPost;
    loginEl.value = email;
    loginEl.dispatchEvent(new Event('input'));

    console.log("entered correct email and detecting changes");

    fixture.detectChanges();
    tick();

    expect(loginEl.value).toBe(email);
    expect(component.email.valid).toBe(true);
    expect(component.email.dirty).toBe(true);
    expect(component.email.errorMsg).toBe('');
    expect(component.email.value).toBe(email);
    
    console.log("checking submit");

    expect(submitEl.disabled).toBeFalsy();
    expect(submitEl.id).toBe("registerButton");

    form.triggerEventHandler('submit', null);


    fixture.detectChanges();
    tick(1000);

    expect(registerSpy).toHaveBeenCalled();
    
  }));  

});
