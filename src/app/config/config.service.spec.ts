import { TestBed, async } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { Http } from '@angular/http';

describe('Service: ConfigService', () => {
  let service: ConfigService;
  const configServiceData: Object= {
      "clientHost": "localhost:3000",
      "apiUrl": "http://api.xyz.com/v1/",
      "title": "Url Manager"
    };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ ConfigService ]
    });
    service = TestBed.get(ConfigService);
  }));
  it(`should create instance of service`, async(() => {
    expect(service).toBeDefined();
  }));
});