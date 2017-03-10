import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticationService{

    constructor(){}

    public getCurrentUser(){
        console.log(localStorage.getItem('currentUser'));
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
      console.log("tempUser = " + JSON.stringify(tempUser));
      return (tempUser && tempUser["token"]) ? true : false;
        
    }
}