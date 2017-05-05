import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

// Load the implementations that should be tested
import { RegisterComponent } from './register.component';
import { AuthenticationHttpService } from './auth.http.service';
import { Router, RouterModule} from '@angular/router'; 
import { RouterTestingModule } from '@angular/router/testing';
import {ReflectiveInjector} from '@angular/core';

function newEvent(eventName: string, bubbles = false, cancelable = false) {
    let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
}

fdescribe(`Register`, () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let debugElement: DebugElement;

  let form: DebugElement;
/*
without nativeElement

  let submitEl: DebugElement;
  let firstnameEl: DebugElement;
  let lastnameEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;
*/

  let submitEl: HTMLTextAreaElement;
  let firstnameEl: HTMLTextAreaElement;
  let lastnameEl: HTMLTextAreaElement;
  let loginEl: HTMLTextAreaElement;
  let passwordEl: HTMLTextAreaElement;

 

  //let registerSpy: jasmine.Spy;
/*
    function setInputValue(selector: string, value: string) {
      let el: HTMLInputElement = fixture.nativeElement.querySelector(selector);
      el.value = value;
      el.dispatchEvent(new Event('input'));
    }
    */

    // not async - DO NOT CHANGE
    beforeEach( () => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          AuthenticationHttpService,
          BaseRequestOptions,
          Location, 
          { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate") }}
        ],
        imports: [HttpModule, RouterTestingModule, FormsModule],
        declarations: [RegisterComponent],
      }).compileComponents();
    })

    // notice async - DO NOT CHANGE
    beforeEach(fakeAsync(() => {


      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;

      //registerSpy = spyOn(component, 'register');

      submitEl = fixture.debugElement.query(By.css('button')).nativeElement;;
      firstnameEl = fixture.debugElement.query(By.css('input[type=firstname]')).nativeElement;;
      lastnameEl = fixture.debugElement.query(By.css('input[type=lastname]')).nativeElement;; 
      loginEl = fixture.debugElement.query(By.css('input[type=email]')).nativeElement;;
      passwordEl = fixture.debugElement.query(By.css('input[type=password]')).nativeElement;;  
      form = fixture.debugElement.query(By.css('form'));
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


  it('should not enable submit button on init', () => {
    fixture.detectChanges();
    expect(submitEl.disabled).toBeTruthy();
  });

  fit('should change private component property when form input changes', fakeAsync(() => {

    expect(firstnameEl.value).toBe('');

    let firstName = "bob";
    let lastName = "jones";
    let email = Math.floor(new Date().valueOf() / 1000) + ".bobjones@registertest.com"
    let password = "1234"

    firstnameEl.value = firstName;
    firstnameEl.dispatchEvent(new Event('input'));

    //fixture.detectChanges();
    //tick();

    lastnameEl.value = lastName;
    lastnameEl.dispatchEvent(new Event('input'));

    //fixture.detectChanges();
    //tick();

    loginEl.value = email;
    loginEl.dispatchEvent(new Event('input'));

    //fixture.detectChanges();
    //tick();

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

    expect(passwordEl.value).toBe(password);
    expect(component.password).toBe(password);  

    expect(submitEl.disabled).toBeFalsy();
    expect(submitEl.id).toBe("registerButton");

    let clickSpy = spyOn(submitEl, 'click');
    //let formSpy = spyOn(form, 'submit');
    let registerSpy = spyOn(component, 'register');
    submitEl.click();

    fixture.detectChanges();
    tick();

    form.triggerEventHandler('submit', null);
    //form.

    fixture.detectChanges();
    tick(1000);

    expect(clickSpy).toHaveBeenCalled();
    expect(registerSpy).toHaveBeenCalled();
    expect(fixture.componentInstance.register).toHaveBeenCalled();
    //expect(component.register).toHaveBeenCalled();
    //expect(component.registered).toBe(true);
    //expect(formSpy).toHaveBeenCalled();
    //form.triggerEventHandler('submit', null);
    //expect(registerSpy).toHaveBeenCalled();

    //expect(component.model.content).toBe(expectedContent);
    //expect(component.model.rating.toString()).toBe(expectedRating);
//http://stackoverflow.com/questions/38786995/avoid-angular2-to-systematically-submit-form-on-button-click
  
//http://plnkr.co/edit/FrVMMaLc0NQkArGUC8yb?p=preview
}));
  it('should do something on blur', () => {
    // test prep
    spyOn(component, 'firstNameBlur');

    firstnameEl.dispatchEvent(new Event('blur'));
    expect(component.firstNameBlur).toHaveBeenCalled();
  });
/*
  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });*/
  //it('should return component\'s AuthenticationHttpService service', () =>{

     // expect(authService).toBeDefined();
  //});
  //it('should return component\'s Router service', () =>{
      //expect(router).toBeDefined();
  //});
/*
  xit(`should register new user successfully`, async(() => {
       spyOn(service, 'authenticateToServer');
      let spyNavigation = spyOn(router, 'navigate');

      const testString = "registerNewUser" + timestamp + "@test.com";

      comp.email = testString;
      comp.password = testString;
      comp.lastName = testString;
      comp.firstName = testString;

      comp.register();
      expect(service.authenticateToServer).toHaveBeenCalled();
      expect(spyNavigation).toHaveBeenCalled();
      expect(spyNavigation).toHaveBeenCalledWith(['/#/login']);
  }));
  */
});