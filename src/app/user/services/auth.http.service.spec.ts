import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticateWithServerService } from './auth.http.service';

import { Configuration } from '../config';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

/*

this is a live http test against a real server

if it errors and returns a status of 0 => the server is not available

*/

describe('User Service: AuthenticateWithServerService', () => {
  let service: AuthenticateWithServerService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ 
        AuthenticateWithServerService,
        BaseRequestOptions,
        Configuration
      ]
    });
    service = TestBed.get(AuthenticateWithServerService);
  }));
  it(`should create instance of service`, async(() => {
    expect(service).toBeDefined();
  }));
  xit(`should make http request to live server`, async(() => {

    // because this is a live http call, increase timeout
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

      const userObj = {
            email: "1@1.com",
            password: "1@1.com"
      };

      const url = Configuration.urls.base + "/auth";

      let authService = TestBed.get(AuthenticateWithServerService);

      // act
      authService.authenticateToServer(userObj, url)
      .then(json => {
        
          console.log(json.branch);
          console.log(json.commit);
          console.log(json.data.token);
          console.log(json.data.id);
          console.log(json.data.email);

          expect(json).toEqual(jasmine.objectContaining({
            branch: "master"
          }));
          expect(json.commit.length).toEqual(7);
          expect(json.data.token).not.toBe('');
          expect(json.data.id).not.toBe('');
          expect(json.data.email).not.toBe('');

          // crazy ivan
          expect(json.data.xyz).not.toBeDefined();

      }).catch(err => {
        console.log("test err = " + err);
        expect(err).toBe(undefined);
      });
      
    //});
  }));
});