import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
 
  user: any;
  constructor() {
      this.user.name="John Doe";
  }

  isLoggedIn() {
    return true;
  }

};