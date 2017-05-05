import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture,
    fakeAsync,
  tick
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

// Load the implementations that should be tested
import { RegisterComponent } from './register.component';
import { AuthenticationHttpService } from './auth.http.service';
import { Router, RouterModule} from '@angular/router'; 
import { RouterTestingModule } from '@angular/router/testing';
import {ReflectiveInjector} from '@angular/core';
//import { ConfigService } from './config/config.service';
//import { AppState } from './app.state';
//import { User } from './user/user.model';

//class MockRouter {
//  navigate(){console.log(" navigate called");}
//}


describe(`Register`, () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let debugElement: DebugElement;
  //let timestamp = Math.floor(new Date().valueOf() / 1000);
  //let service;
  //let router;
  //let location;
  //let authService: AuthenticationHttpService;
  //let titleService: Title; 

/*
  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthenticationHttpService}
        ,Location
        ,{ provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); }
    }
      ],
      imports: [RouterTestingModule, FormsModule]
    })
    .compileComponents(); // compile template and css

    fixture = TestBed.createComponent(RegisterComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
    debugElement = fixture.debugElement;

    authService = fixture.debugElement.injector.get(AuthenticationHttpService);
    //router = fixture.debugElement.injector.get(Router);
  }));

*/


    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [AuthenticationHttpService],
        imports: [RouterTestingModule, FormsModule, HttpModule],
        declarations: [RegisterComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      
    });


  
/*it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });*/
//http://stackoverflow.com/questions/41897444/angular2-testing-error-when-trying-to-use-angular-platform-browser-testing-br
//https://github.com/angular/angular/blob/master/packages/forms/test/template_integration_spec.ts#L14
   fit('should bind the input to the correct property', () => {
    // first round of change detection
    fixture.detectChanges();
    // get ahold of the input
    let input = debugElement.query(By.css('#firstName'));
    let inputElement = input.nativeElement;

    //set input value
    inputElement.value = 'test value';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.firstName).toBe('test value');
  });
/*

  it('should allow us to set a bound input field', <any>fakeAsync((): void => {
    setInputValue('#firstname', 'Tommy');

    expect(comp.firstName).toEqual('Tommy');
  }));

  // must be called from within fakeAsync due to use of tick()
  function setInputValue(selector: string, value: string) {
    fixture.detectChanges();
    tick();

    let input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    tick();
  }
*/
/*
  fit('should have called router on success registration', () =>{

    function sendInput(text: string) {
      inputElement.value = text;
      inputElement.dispatchEvent(fixture.nativeElement, 'input');
      fixture.detectChanges();
      return fixture.whenStable();
    }

    let getInput = (debugElement: DebugElement): DebugElement => {
      console.log("inside getInpu");
      let elem = debugElement.query(By.css('#firstname'));
      console.log(elem);
      return elem;
    };

    fixture.detectChanges();
    let input = getInput(debugElement);
    //console.log(JSON.stringify(input));
    let inputElement = input.nativeElement;
    inputElement.value = 'test value';
    inputElement.dispatchEvent(new Event('input'));
    expect(comp.firstName).toBe('test value');


  });

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