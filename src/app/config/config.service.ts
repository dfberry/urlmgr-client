import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

//http://stackoverflow.com/questions/37992671/how-to-preload-a-config-file-in-angular2
@Injectable()
export class ConfigService {
 
  public static config: any=null;
  private static _promise: Promise<any>;

  constructor(private http: Http) {
        ConfigService._promise = this.load();
  }
  load() {
      return new Promise((resolve, reject) => {
          this.http.get('config.json')
              .map((response) => response.json())
              .catch((error: any) => {
                  console.error(error);
                  return Observable.throw(error.json().error || 'Server error');
              })
              .subscribe((data) => {
                  ConfigService.config = data;
                  resolve(true);
              });
      });
  }

  get(key: any) {
      return  ConfigService.config[key];
  }
  getAll(){
    return ConfigService.config;
  }
};


