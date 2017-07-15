import { NO_ERRORS_SCHEMA, Injectable, Component} from '@angular/core';
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick  } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';

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
    return this.inner.get();
  }
}
@Component({
  selector: 'dashboard',
  template: `
   <div class="dashboard"></div>
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

describe('Component: Jasmine Spy Test', () => { 
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let service: OuterService;
  let serviceInner: InnerService;
  let spy: any;
  let spyInner: any;
  let expectResults = "spy value";

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DashboardComponent],
      providers: [ 
        InnerService,
        OuterService
      ]
    }).compileComponents();

    service = TestBed.get(OuterService);  
    serviceInner = TestBed.get(InnerService);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });
  it(`should create instance of objects`, () => {
    expect(component).toBeDefined();
    expect(fixture).toBeDefined();
    expect(service).toBeDefined();
    expect(serviceInner).toBeDefined();
  });
  it('should return html from component', () =>{
      let de = fixture.debugElement.query(By.css('.dashboard'));
      expect(de).toBeDefined();
  });
  it(`should create spy of ID service`, () => {
      
      spy = spyOn(service, 'get').and.returnValue(expectResults);

      let results = component.get();

      console.log("results = " + results);
      expect(results).toBe(expectResults);
      expect(service.get).toHaveBeenCalled(); 
  });
});