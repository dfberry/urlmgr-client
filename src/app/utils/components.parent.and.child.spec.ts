import { NO_ERRORS_SCHEMA, Injectable, Component} from '@angular/core';
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick  } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';

@Injectable()
export class ChildDIService {

  public childDIValue:any= "child DI value";

  constructor(){}

  public set(val){
    console.log("child set " + val);
    this.childDIValue=val;
  }
  public get(){
    return this.childDIValue;
  }
}

@Injectable()
export class ChildService {

  public childValue:any= "child value";

  constructor(private childDIService:ChildDIService){}

  public set(val){
    console.log("child set " + val);
    this.childValue=val;
  }
  public get(){
    return this.childValue;
  }
}

@Injectable()
export class InnerService {

  public innerValue:any= "inner value";

  constructor(){}

  public set(val){
    console.log("inner set " + val);
    this.innerValue=val;
  }
  public get(){
    return this.innerValue;
  }
}

@Injectable()
export class OuterService {

  constructor(
    private inner: InnerService
  ){}

  public set(val){
    console.log("outer set " + val);
    return ("return: " + this.inner.set(val));
  }
  public get(){
    let val = this.inner.get();
    console.log("outerservice get, returning val = " + val);
    return val;
  }
}
@Component({
  selector: 'dashboard-child',
  template: `
   <div class="dashboard"></div>
  `
})
export class ChildComponent {
  constructor(
    private childService: ChildService
  ){
  }
}

@Component({
  selector: 'dashboard',
  template: `
   <div class="dashboard">
    <dashboard-child></dashboard-child>
   </div>
  `
})
export class DashboardComponent {

  constructor(
    private outerService: OuterService
  ){}
  ngOnInit(){
    this.outerService.set("initial set");
  }
  get() {
    return this.outerService.get();
  }
}

/*

So the question is why do I have to mock the class if I 
intend to only use a spy and return results through the spy. 
Really don't know. The only way the TestBed will compile 
when there are nested components where the child has DI is 
to provide a mock class, then spy on the mock class -- by 
returning fake results -- hence only using the mock for compilation
and not running test. 

*/
class mockClass {
  get(){}
}

describe('Component: Jasmine Spy Test', () => { 
  let component: DashboardComponent;
  let component2: ChildComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let fixture2: ComponentFixture<ChildComponent>;

  let service: OuterService;
  let serviceInner: InnerService;
  let spy: any;
  let spyInner: any;
  let expectResults = "spy value";

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DashboardComponent, ChildComponent],
      providers: [ 
        { provide: InnerService, useClass: mockClass },
        OuterService,
        { provide: ChildService, useClass: mockClass },
        { provide: ChildDIService, useClass: mockClass}
      ]
    }).compileComponents();

    service = TestBed.get(OuterService);  
    serviceInner = TestBed.get(InnerService);

    fixture = TestBed.createComponent(DashboardComponent);
    fixture2 = TestBed.createComponent(ChildComponent);
    component = fixture.componentInstance;
    component2 = fixture2.componentInstance;
  });
  it(`should create instance of objects`, () => {
    expect(component).toBeDefined();
    expect(component2).toBeDefined();
    expect(fixture).toBeDefined();
    expect(fixture2).toBeDefined();
    expect(service).toBeDefined();
    expect(serviceInner).toBeDefined();
  });
  it('should return html from component', () =>{
      let de = fixture.debugElement.query(By.css('.dashboard'));
      expect(de).toBeDefined();
  });
  it(`should create spy of ID service`, () => {
      
      spy = spyOn(serviceInner, 'get').and.returnValue(expectResults);

      let results = component.get();

      console.log("results = " + results);
      expect(results).toBe(expectResults);
      expect(spy).toHaveBeenCalled(); 
  });
});