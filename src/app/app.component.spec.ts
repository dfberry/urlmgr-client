import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { Title, By } from '@angular/platform-browser';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AuthenticationService } from './user/auth.service';
import { ConfigService } from './config/config.service';
import { AppState } from './app.state';
import { User } from './user/user.model';


class MockConfigService {
  public config: any={};
  public get(key:any){return this.config[key];}
  public getAll(){return this.config};
  public load(data){this.config = data;}

}  
class MockAppState {
  public u: User;
  public setUser(u:User){ this.u = u;}
  public getCurrentUser(){return this.u;}
}  
class MockTitleService {
  x: string="";
  public setTitle(x){ this.x = x};
  public getTitle(){return this.x;}
}
class MockUserService {
  user: User;
  public userLogon(x:User){this.user = x;}
}
class MockAuthenticationService {
  user: User;
  public setCurrentUser(x:User){this.user = x;}
  public getCurrentUser(){return this.user;}
}
/*
https://github.com/ngrx/store/issues/78
import { StoreModule } from '@ngrx/store';

   // Add the imported module to the imports array in beforeEach 
   beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({})
      ],
      declarations: [
        // The component that's being tested
      ]
    })
    .compileComponents();
  }));

*/


describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  //let titleService: Title; 

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      // DI to component
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService},
        { provide: ConfigService, useClass: MockConfigService},
        { provide: AppState, useClass: MockAppState },
        { provide: Title, useClass: MockTitleService},
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
      console.log(configService);
      expect(configService).toBeDefined();
  });
  it('should return component\'s title service', () =>{
      let titleService = fixture.debugElement.injector.get(Title);
      console.log(titleService);
      expect(titleService).toBeDefined();
  });
  
  it('should return html from app component', () =>{
      let de = fixture.debugElement.query(By.css('.container'));
      console.log(de);
      expect(de).toBeDefined();
  });
  
  it('Title Should be Valid', () => {
    let testTitle = 'spectest';
    let titleService = TestBed.get(Title);

    comp.setTitle(testTitle);
    expect(titleService.getTitle()).toBe(testTitle);
    expect(comp.title).toBe(testTitle);
  });

  it('should return current user', () => {
    let testUser = new User();
    testUser.email = "testUser@test.com";

    let authService = TestBed.get(AuthenticationService);
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

