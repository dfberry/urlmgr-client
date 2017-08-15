import { ViewChild, Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { inject, async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

import {Broadcaster} from '../services/broadcast';
import { ActionReducer, Action, Store } from '@ngrx/store';
// Load the implementations that should be tested
import { NavigationComponent } from './navigation.component';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';
import { MockData, MockUrlEvent, MockStore, MockAppState, MockLocalStorage, MockActivatedRoute, MockUserEvent } from '../utils/mocks';
import { User, UserEvent } from '../user';
import { UrlEvent, UrlService, UrlMgrComponent } from '../url';
import { AppState, UrlActions, UserActions } from '../app.state';


describe(`Navigation Component`, () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let navigationFixture: ComponentFixture<NavigationComponent>;
  let navigationComponent: NavigationComponent;

  let user:User;
  let el:any;

  //https://medium.com/@AikoPath/testing-angular-components-with-input-3bd6c07cfaf6
  @Component({
    selector: `host-component`,
    template: `<navigation class="childcomponent" #child [user]="user" ></navigation>`
  })
  class TestHostComponent {
    @ViewChild('child')
    public componentUnderTestComponent: NavigationComponent;
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        // no DI for this component yet
      ],
      declarations: [
        NavigationComponent,
        TestHostComponent
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    navigationFixture = TestBed.createComponent(NavigationComponent);
    navigationComponent = navigationFixture.componentInstance;
    el = navigationFixture.debugElement.nativeElement;

  });
  it('should define everything', () => { 
    expect(testHostFixture).toBeDefined();
    expect(testHostComponent).toBeDefined();
    expect(navigationFixture).toBeDefined();
    expect(navigationComponent).toBeDefined();
  });  
  
  it('should return html from component', () =>{
      let de = navigationFixture.debugElement.query(By.css('.navigation'));

      expect(de).toBeDefined();
  });
  it('should show admin navigation elements', async(() => {
  
      let newUser = new User();
      newUser.email = "fake@fake.com";
      newUser.id="fakeid";
      newUser.isAdmin = true;
      newUser.isAuthenticated = true;
  
      testHostComponent.setInput(newUser);
      testHostFixture.detectChanges();

      let de = testHostFixture.debugElement.query(By.css('.childcomponent'));
      let dom = de.nativeElement;

      expect(dom.querySelector(".admin")).toBeDefined();
      expect(dom.querySelector(".auth")).toBeDefined();
      expect(testHostComponent.componentUnderTestComponent.user).toBe(newUser);  
  }));  
  it('should not show admin navigation elements', async(() => {
    
        let newUser = new User();
        newUser.email = "fake@fake.com";
        newUser.id="fakeid";
        newUser.isAdmin = false;
        newUser.isAuthenticated = true;
    
        testHostComponent.setInput(newUser);
        testHostFixture.detectChanges();
  
        let de = testHostFixture.debugElement.query(By.css('.childcomponent'));
        let dom = de.nativeElement;
  
        expect(dom.querySelector(".not-admin")).toBeDefined();
        expect(dom.querySelector(".auth")).toBeDefined();
        expect(testHostComponent.componentUnderTestComponent.user).toBe(newUser);  
    })); 
    it('should show login if not authenticated', async(() => {
      
          let newUser = new User();
          newUser.email = "fake@fake.com";
          newUser.id="fakeid";
          newUser.isAdmin = false;
          newUser.isAuthenticated = false;
      
          testHostComponent.setInput(newUser);
          testHostFixture.detectChanges();
    
          let de = testHostFixture.debugElement.query(By.css('.childcomponent'));
          let dom = de.nativeElement;
    
          expect(dom.querySelector(".not-admin")).toBeDefined();
          expect(dom.querySelector(".not-auth")).toBeDefined();
          expect(testHostComponent.componentUnderTestComponent.user).toBe(newUser);  
      }));
});
