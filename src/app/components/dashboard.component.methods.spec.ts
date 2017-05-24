import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';



// Load the implementations that should be tested
import { DashboardComponent } from './dashboard.component';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';
import { MockUrlService, MockData, MockUrlEvent, MockStore, MockAppState, MockLocalStorage, MockActivatedRoute, MockUserEvent } from '../utils/mocks';
import { User, UserEvent } from '../user';
import { UrlEvent, UrlService } from '../url';
import { AppState, UrlActions, UserActions } from '../app.state';

describe(`Dashboard Component Method`, () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let mockUrlList1 = MockData.UrlList();

  let urlServiceSpy;
  let urlServiceMock;

  let appStateServiceSpy;
  let appStateServiceMock;

  let user:User;

  beforeEach(() => {


    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserEvent, useValue: MockUserEvent },
        { provide: UrlEvent, useValue: MockUrlEvent },
        { provide: UrlService, useClass: MockUrlService },
        { provide: AppState, useClass: MockAppState }
      ],
      imports: [HttpModule, RouterTestingModule],
      declarations: [DashboardComponent],
    }).compileComponents();
  });

  // fakeAsync so I can use tick
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    console.log(mockUrlList1);

    urlServiceMock = fixture.debugElement.injector.get(UrlService);
    appStateServiceMock = fixture.debugElement.injector.get(AppState);

    user = new User();
    user.id = '123';
    user.isAuthenticated = true;

  }));
  it('should define everything', () => {
    expect(component.loadUrls).toBeDefined();
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });  
  it('should return html from component', () =>{
      let de = fixture.debugElement.query(By.css('.dashboard'));

      expect(de).toBeDefined();
  });
  it('should load user\'s urls into this.urls', () => {
    urlServiceSpy = spyOn(urlServiceMock, "loadItems")
      .and.returnValue(Observable.of(mockUrlList1));
    appStateServiceSpy = spyOn(appStateServiceMock, "setUrls");

    component.user = user;
    component.loadUrls();
    
    expect(urlServiceSpy).toHaveBeenCalled();
    expect(appStateServiceSpy).toHaveBeenCalled();
    expect(JSON.stringify(component.urls)).toEqual(JSON.stringify(mockUrlList1));
    expect(JSON.stringify(component.user)).toEqual(JSON.stringify(user));
  });
  it('should clear urls', () => {
    appStateServiceSpy = spyOn(appStateServiceMock, "clearUrls");

    component.user = user;
    component.clearUrls();
    
    expect(appStateServiceSpy).toHaveBeenCalled();
    expect(component.urls).toEqual([]);
    expect(JSON.stringify(component.user)).toEqual(JSON.stringify(user));
  });
});
