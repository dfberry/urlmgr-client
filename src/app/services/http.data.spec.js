"use strict";
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
var index_1 = require('../reducers/index');
describe('Service: UrlService', function () {
    var urlService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                //{ provide: VIMEO_API_URL, useValue: 'http://example.com' },
                index_1.UrlService,
                {
                    provide: http_1.Http,
                    useFactory: function (mockBackend, options) {
                        return new http_1.Http(mockBackend, options);
                    },
                    deps: [testing_2.MockBackend, http_1.BaseRequestOptions]
                },
                testing_2.MockBackend,
                http_1.BaseRequestOptions
            ]
        });
    });
    //specs
    it('should return title', function () {
        //inject([UrlService, MockBackend], (urlService, mockBackend) => {
        //    mockBackend.connections.subscribe((connection) => {
        //    urlService.getTitle('http://www.microsoft.com') ;
        //})
        //let title = urlService.getTitle('http://www.microsoft.com');
        //expect(title).toContain('Microsoft – Official Home Page');
    });
});
//# sourceMappingURL=http.data.spec.js.map