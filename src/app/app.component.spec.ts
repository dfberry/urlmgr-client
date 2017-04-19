import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AuthenticationService } from './user/auth.service';
import { ConfigService } from './config/config.service';
//import { AppState } from './app.state';

class MockTestService {
  public mockName: string = 'Mocked Service';
}  

describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  //let titleService: Title; 

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AuthenticationService,
        {provide: ConfigService, useValue: MockTestService}
      ]
    })
    .compileComponents(); // compile template and css

    fixture = TestBed.createComponent(AppComponent);
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
  it('should return html from app component', () =>{
      let de = fixture.debugElement.query(By.css('.container'));
      console.log(de);
      expect(de).toBeDefined();
  });
  /*
  it('Title Should be Valid', () => {
    let testTitle = 'spectest';
    titleService = TestBed.get(Title);

    comp.setTitle(testTitle);
    expect(titleService.getTitle()).toBe(testTitle);
    expect(comp.title).toBe(testTitle);
  });*/
});

