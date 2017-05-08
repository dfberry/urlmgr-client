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

    emailErrorsContainerEl = fixture.debugElement.query(By.css('div[type=emailerrorcontainer]')).nativeElement;;
    emailErrorsEl = fixture.debugElement.query(By.css('label[type=emailErrors]')).nativeElement;

    form = fixture.debugElement.query(By.css('form'));

    clickSpy = spyOn(submitEl, 'click');
    //registerSpy = spyOn(component, 'register').and.callThrough();
    registerSpy = spyOn(component, 'register');

    fixture.detectChanges();
    tick();
  }));


  fit(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
    expect(debugElement).toBeDefined();

    expect(submitEl).toBeDefined();

    expect(loginEl).toBeDefined();
    expect(emailErrorsContainerEl).toBeDefined();
    expect(emailErrorsEl).toBeDefined();
    expect(passwordEl).toBeDefined();

    expect(firstnameEl).toBeDefined();
    expect(lastnameEl).toBeDefined();
  });

  it('should register with submit button', fakeAsync(() => {

    expect(firstnameEl.value).toBe('');
    expect(lastnameEl.value).toBe('');

    expect(loginEl.value).toBe('');
    //expect(emailErrorsContainerEl.hasAttribute('hidden')).toEqual(true);
    expect(emailErrorsEl).toEqual('');

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
    expect(component.email).toBe(email);

    expect(emailErrorsContainerEl.hasAttribute('hidden')).toEqual(true);
    expect(emailErrorsEl).toEqual('');

    expect(passwordEl.value).toBe(password);
    expect(component.password).toBe(password);

    expect(submitEl.disabled).toBeFalsy();
    expect(submitEl.id).toBe("registerButton");

    form.triggerEventHandler('submit', null);


    fixture.detectChanges();
    tick(1000);

    expect(registerSpy).toHaveBeenCalled();

  }));
});
