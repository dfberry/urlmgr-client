import {Injectable} from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

@Injectable()
export class InnerService {

  public innerValue:any;

  constructor(){}

  public set(val){
    console.log("inner set " + val);
    this.innerValue=val;
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
}

describe('Service: Jasmine Spy Test', () => { 
  let service: OuterService;
  let serviceInner: InnerService;
  let spy: any;
  let spyInner: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        InnerService,
        OuterService
      ]
    });
    service = TestBed.get(OuterService);  
    serviceInner = TestBed.get(InnerService);
  });
  it(`should create instance of service`, () => {
    expect(service).toBeDefined();
  });
  it(`should create spy of outer service`, () => {
      
      let expectResults = "outer spy value for set";

      spy = spyOn(service, 'set').and.returnValue(expectResults);

      let results = service.set('xyz');

      console.log("results = " + results);
      expect(results).toBe(expectResults);
      expect(service.set).toHaveBeenCalled(); 
  });
  it(`should create spy of inner service`, () => {
      
      let expectResults = "inner spy value for set";

      spy = spyOn(serviceInner, 'set').and.returnValue(expectResults);

      let results = service.set('xyz');

      console.log("results = " + results);
      expect(results).toBe("return: " + expectResults);
      expect(serviceInner.set).toHaveBeenCalled(); 

  });
});