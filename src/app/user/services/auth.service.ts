import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../user.model';

// all authentication is kept in local storage - not state
@Injectable()
export class AuthenticationService{

    currentUser: Observable<User>;

    constructor(){

    }

    public getCurrentUser(){
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    public setCurrentUser(currentUser){
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    public removeCurrentUser(){
      localStorage.removeItem('currentUser');
    }
    public isAuthenticated() {
      let tempUser = this.getCurrentUser();
      return (tempUser && tempUser["isAuthenticated"]);
    }



}