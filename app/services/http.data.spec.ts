import { TestBed,async,  inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { UrlService } from '../reducers/index';

describe('Service: UrlService', () => {
  
    beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        //{ provide: VIMEO_API_URL, useValue: 'http://example.com' },
        UrlService,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
        
    });
  
    //specs
    it('should return title', () => {


        //inject([UrlService, MockBackend], (urlService, mockBackend) => {
        //    mockBackend.connections.subscribe((connection) => {
        //    urlService.getTitle('http://www.microsoft.com') ;
        //})

        //let title = urlService.getTitle('http://www.microsoft.com');
        //expect(title).toContain('Microsoft – Official Home Page');
    });
})
