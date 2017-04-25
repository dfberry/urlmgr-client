import { AppState } from '../app.state';
import { User } from '../user/user.model';

export class MockAppState {
  public mock: string = "mock";
  public u: MockUser = new MockUser();

  public setUser(u:MockUser){ this.u = u;}
  public getCurrentUser(){return this.u;}
} 
export class MockUserService {
  user: MockUser;
  public userLogon(x:MockUser){this.user = x;}
}
export class MockUser {
  id: string="";
  email: string="";
  firstName: string="";
  lastName: string="";
  token: string="";
  roles: string[];
  expires: string="0";
  public isAuthenticated: boolean=false;
  lastLogin:string = "0";

  public transform(user: any){
    if(!user)return;

    if(user.hasOwnProperty("id")) this.id = user.id;
    if(user.hasOwnProperty("email")) this.email = user.email;
    if(user.hasOwnProperty("firstName")) this.firstName = user.firstName;
    if(user.hasOwnProperty("lastName")) this.lastName = user.lastName;
    if(user.hasOwnProperty("token")) this.token = user.token;
    if(user.hasOwnProperty("roles")) this.roles = user.roles;
    if(user.hasOwnProperty("expires")) this.expires = user.expires;
    if(user.hasOwnProperty("isAuthenticated")) this.isAuthenticated = user.isAuthenticated;
    if(user.hasOwnProperty("lastLogin")) this.lastLogin = user.lastLogin;
  }
}


export class MockConfigService {
  public config: any={};
  public get(key:any){return this.config[key];}
  public getAll(){return this.config};
  public load(data){this.config = data;}

}  

export function userIsAuthenticated(){
  return true;
}

export function userIsNotAuthenticated(){
  return false;
}

export class MockTitleService {
  x: string="";
  public setTitle(x){ this.x = x};
  public getTitle(){return this.x;}
}
export class MockAuthenticationService {
  user: User;
  public setCurrentUser(x:User){this.user = x;}
  public getCurrentUser(){return this.user;}
}