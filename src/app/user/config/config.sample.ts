import { Injectable } from '@angular/core';

// TODO: in order to set this values 
// rename this file to config.ts
// set base url to your api endpoint for authentication
@Injectable()
export class Configuration {
  public static urls = {
    base:"http://localhost/v1",
    auth: ['login', 'register', 'logout']
  };
}