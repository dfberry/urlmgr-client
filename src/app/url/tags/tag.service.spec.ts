import { TestBed, fakeAsync, async, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection, } from '@angular/http/testing';
import { HttpModule, Http, RequestOptions, BaseRequestOptions, XHRBackend, Response, RequestMethod, ResponseOptions } from '@angular/http';

import { TagService } from './tag.service';

describe('Tag Service', () => {

//https://auth0.com/blog/angular-testing-in-depth-http-services/

//let tagService: TagService;
let service: TagService;
let backend: MockBackend;
let config={
    "name": "mockConfigObject",
    "clientHost": "localhost:3000",
    "apiUrl": "http://localhost:3003/v1/",
    "title": "Url Manager"   
  };

beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TagService,
        MockBackend,
        BaseRequestOptions,
        {
            provide: Http,
            useFactory: (mockBackend: MockBackend, defaultOptions: RequestOptions) => {
              return new Http(mockBackend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          }
      ]
    });
  });
  beforeEach(inject([TagService, MockBackend], (tagService, mockBackend) => {
    service = tagService;
    backend = mockBackend;
  }));
  it(`should create instance of service`, async(() => {
    expect(service).toBeDefined();
    expect(backend).toBeDefined();
  }));
  it('should get data from fake http service', (done) => {
    let profileInfo = { login: 'sonic', id: 325, name: 'Tester' };
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({ body: profileInfo });
  
      connection.mockRespond(new Response(options));
    });
  
    service.load(config).subscribe((response) => {
      console.log(response);
      expect(response).toEqual(profileInfo);
      done();
    });
  });
});
