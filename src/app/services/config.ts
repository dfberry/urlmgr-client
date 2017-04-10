import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ConfigService {
 
  config: any;
  constructor(private http: Http) {}

  load() {
    //console.log('Inside Load');
    return new Promise((resolve) => {
      this.http.get('config.json').map(res => res.json())
        .subscribe(config => {
          //console.log('Configuration loaded...........');
          //console.log(config);
          this.config = config;
          console.log(this.config);
          resolve();
        });
    });
  }

};