import { Injectable } from '@angular/core';


// all authentication is kept in local storage - not state
@Injectable()
export class Configuration {
  public static urls = {
    base:"http://urlmgrapi.dfberry.io/v1",
    auth: ['login', 'register', 'logout']
  };
}