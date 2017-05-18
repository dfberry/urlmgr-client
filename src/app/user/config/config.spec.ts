import { TestBed, async, inject } from '@angular/core/testing';
import { Configuration } from './config';

import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

/*

this is a live http test against a real server

if it errors and returns a status of 0 => the server is not available

*/

describe('User Service: Configuration', () => {
  let service: Configuration;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ 
        BaseRequestOptions,
        Configuration
      ]
    });
    service = TestBed.get(Configuration);
  }));
  it(`should create instance of service`, async(() => {
    expect(service).toBeDefined();

    // static method
    expect(Configuration.urls).toBeDefined();

    expect(Configuration.urls.base).toBeDefined();
    expect(Configuration.urls.auth).toBeDefined();

    let base:string = Configuration.urls.base;

    expect(base[base.length-1]!='/');
  }));
});