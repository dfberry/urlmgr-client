import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//http://stackoverflow.com/questions/37992671/how-to-preload-a-config-file-in-angular2

//notice config for backend api is passed in, not fetched as part of call

@Injectable()
export class TagService {
 
  public results: any;

  constructor(private http: Http) {}
  load(config) {

      if(!config || !config.apiUrl) return Observable.throw('error constructing api url');

      let url = config.apiUrl + '/tags/all';

      return this.http
      .get(url)
      .map((response: Response) => response.json());

    }
  }

  import { TestBed, fakeAsync, async, inject, tick } from '@angular/core/testing';
  import { MockBackend, MockConnection, } from '@angular/http/testing';
  import { HttpModule,  RequestOptions, BaseRequestOptions, XHRBackend,  RequestMethod, ResponseOptions } from '@angular/http';
  
  describe('Service depends on Http Service, config passed in as param to fn', () => {
  
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