import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

// Load the implementations that should be tested
import { ProfileComponent } from './profile.component';
import {  ClientAuthenticationService, UserEvent } from '../services';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';
import { User } from '../user.model';

import { MockActivatedRoute, newEvent, MockLocalStorage } from '../../utils/mocks';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

describe(`User Profile Component UX`, () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let debugElement: DebugElement;
  let form: DebugElement;

  let authServiceStub;

  beforeEach(() => {

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ClientAuthenticationService, useClass: MockLocalStorage }
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


    form = fixture.debugElement.query(By.css('form'));

    fixture.detectChanges();
    tick();
  }));


  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
    expect(debugElement).toBeDefined();
  });
});
