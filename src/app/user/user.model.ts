
import { Token } from './token.model';

export class BroadcastRegistrationData {
  email: string="";
  firstName: string="";
  lastName: string="";
  password: string="";
  response: string="";
}
export class BroadcastLogonData {
  email: string="";
  password: string="";
  response: string="";
}
export class BroadcastLogoffData {
  email: string="";
  id: string="";
  token: string="";
  response: string="";
}

export class User {
  id: string="";
  email: string="";
  firstName: string="";
  lastName: string="";
  token: Token = new Token();
  roles: string[];
  expires: string="0";
  isAuthenticated: boolean=false;
  lastLogin:string = "0";

  public transform(user: any){
    if(!user)return;

    console.log("User Model Transform = " + JSON.stringify(user));

    if(user.hasOwnProperty("id")) this.id = user.id;
    if(user.hasOwnProperty("email")) this.email = user.email;
    if(user.hasOwnProperty("firstName")) this.firstName = user.firstName;
    if(user.hasOwnProperty("lastName")) this.lastName = user.lastName;
    if(user.hasOwnProperty("token")) this.token.transform(user.token);
    if(user.hasOwnProperty("roles")) this.roles = user.roles;
    if(user.hasOwnProperty("expires")) this.expires = user.expires;
    if (this.token && this.token.token && (!this.token.revoked)) this.isAuthenticated = true;
    if(user.hasOwnProperty("lastLogin")) this.lastLogin = user.lastLogin;
  }
}