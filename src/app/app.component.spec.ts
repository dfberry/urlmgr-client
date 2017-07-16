import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { ServerUserEvent } from './events';
import { Title, By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ClientAuthenticationService, UserEvent} from './user';
import { ConfigService } from './config/config.service';
import { AppState } from './app.state';
import { User } from './user/user.model';
import { MockServerUserEvent, MockUserEvent, MockLocalStorage, MockConfigService, MockAppState, MockTitleService} from './utils/mocks';

describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  //let titleService: Title; 

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpModule],
      
      // DI to component
      providers: [
        { provide: ClientAuthenticationService, useClass: MockLocalStorage},
        { provide: ConfigService, useClass: MockConfigService},
        { provide: AppState, useClass: MockAppState},
        { provide: Title, useClass: MockTitleService},
        { provide: UserEvent, useClass: MockUserEvent}
      ]
    })
    .compileComponents(); // compile template and css

    fixture = TestBed.createComponent(AppComponent);

    // instance of component
    comp    = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding

  }));
  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });
  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });
  it('should return component\'s config service', () =>{
      let configService = fixture.debugElement.injector.get(ConfigService);

      expect(configService).toBeDefined();
  });
  it('should return component\'s title service', () =>{
      let titleService = fixture.debugElement.injector.get(Title);

      expect(titleService).toBeDefined();
  });
  
  it('should return html from app component', () =>{
      let de = fixture.debugElement.query(By.css('.container'));

      expect(de).toBeDefined();
  });
  
  it('Title Should be Valid', () => {
    let testTitle = 'spectest';
    let titleService = TestBed.get(Title);

    comp.setTitle(testTitle);
    expect(titleService.getTitle()).toBe(testTitle);
    expect(comp.title).toBe(testTitle);
  });
/*
  it('should return current user', () => {
    let testUser = new User();
    testUser.email = "testUser@test.com";

    let authService = TestBed.get(ClientAuthenticationService);
    authService.setCurrentUser(testUser);

    expect(comp.getCurrentUser()).toBe(testUser);
  });
  
  it('User Should be Set in State', () => {
    let user = new User();
    user.email = "testuser@test.com";
    comp.loadUserStateFromLocalStorage(user);

    let appState = TestBed.get(AppState);
    let returnedUser: User = appState.getCurrentUser();
 
    expect(returnedUser).toBe(user);
  });  
  */
  
  
  /*
  it('Config values Should be Valid', () => {
    let values = {a:1, b:{c:3}};
    let service = TestBed.get(ConfigService);
    service.config = values;

    comp.loadUserStateFromLocalStorage(testTitle);
    expect(titleService.getTitle()).toBe(testTitle);
    expect(comp.title).toBe(testTitle);
  }); */ 
});

