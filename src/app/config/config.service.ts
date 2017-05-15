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

                  // quit if API url is not correct
                  if (this.validateUrl(data.apiUrl)){
                    ConfigService.config = data;
                    resolve(true);
                  } else {
                    resolve(false);
                  }
              });

      });
  }

  get(key: any) {
      return  ConfigService.config[key];
  }
  getAll(){
    return ConfigService.config;
  }
  validateUrl(url){
    console.log("App Config Service, " + url );

    if(url && url[url.length-1]=='/')return true;

    throw new Error("App Config Service, malformed Url");
  }
};


