import { TestBed, async, inject } from '@angular/core/testing';
import { ConfigService } from './config.service';


import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions } from '@angular/http';

// TBD: import actual config settings from ./config.json

fdescribe('Service: ConfigService', () => {
  let service: ConfigService;
  const configServiceData: Object= {
      "clientHost": "localhost:3000",
      "apiUrl": "http://api.xyz.com/v1/",
      "title": "Url Manager"
    };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ 
        ConfigService,
        BaseRequestOptions,
        MockBackend,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
    service = TestBed.get(ConfigService);
  }));
  it(`should create instance of service`, async(() => {
    expect(service).toBeDefined();
  }));
  it(`should load config file successfully`, async(() => {
    inject([ConfigService, XHRBackend], (configService, mockBackend) => {

      const mockResponse = {
        "livetest": "wednesday 11:02am",
        "clientHost": "localhost:3000",
        "apiUrl": "http://urlmgrapi.dfberry.io/v1/",
        "xxx": "http://localhost:3003/v1/",
        "rssProxy": "http://api.rss2json.com/v1/api.json?rss_url=",
        "title": "Url Manager"
      };

      mockBackend.connections.subscribe((connection) => {

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));

        configService.load();
        expect(JSON.parse(JSON.stringify(configService.config))).toBe(JSON.parse(JSON.stringify(mockResponse)));
      });
    });
  }));
});