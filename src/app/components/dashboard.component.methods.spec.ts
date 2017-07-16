import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

import {Broadcaster} from '../services/broadcast';
import { ActionReducer, Action, Store } from '@ngrx/store';
// Load the implementations that should be tested
import { DashboardComponent } from './dashboard.component';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';
import { MockData, MockUrlEvent, MockStore, MockAppState, MockLocalStorage, MockActivatedRoute, MockUserEvent } from '../utils/mocks';
import { User, UserEvent } from '../user';
import { UrlEvent, UrlService, UrlMgrComponent } from '../url';
import { AppState, UrlActions, UserActions } from '../app.state';

class MockUrlService{
  urls:any;
  loadItems(){}
}
class MockAppStateService{
  clearUrls(){}
  setUrls(urls){}
}
class MockEvent{}

describe(`Dashboard Component Method`, () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let service: UrlService;
  let state: AppState;

  let spyService:any;
  let spyState:any;

  let user:User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: UserEvent, useClass: MockEvent},
        {provide: UrlEvent, useClass: MockEvent},
        {provide: UrlService, useClass: MockUrlService},
        {provide: AppState, useClass: MockAppStateService} 
      ],
      declarations: [
        DashboardComponent, UrlMgrComponent
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    service = TestBed.get(UrlService); 
    state = TestBed.get(AppState);

    user = new User();
    user.id = '123';
  });

  it('should define everything', () => { 
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
    expect(service).toBeDefined();
    expect(state).toBeDefined();
  });  
  
  it('should return html from component', () =>{
      let de = fixture.debugElement.query(By.css('.dashboard'));

      expect(de).toBeDefined();
  });
  it('should load user\'s urls into this.urls', () => {

    let testData = MockData.UrlList();

    spyService = spyOn(service, "loadItems")
      .and.returnValue(Observable.of({'urls': testData}));

    component.user = user;
    component.loadUrls();

    expect(spyService).toHaveBeenCalled();
    expect(JSON.stringify(component.urls)).toEqual(JSON.stringify(testData));
    expect(JSON.stringify(component.user)).toEqual(JSON.stringify(user));
  }); 
  it('should clear urls', () => {
    spyState = spyOn(state, "clearUrls");

    component.user = user;
    component.clearUrls();
    
    expect(spyState).toHaveBeenCalled();
    expect(component.urls).toEqual([]);
    expect(JSON.stringify(component.user)).toEqual(JSON.stringify(user));
  });
  
});
