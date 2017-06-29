import { AppState } from '../app.state';
import { User } from '../user';
import { Url } from '../url';
import { Observable } from 'rxjs/Rx';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';

export class MockAppState {
  public mock: string = "mock";
  public u: MockUser = new MockUser();

  public setUser(u:MockUser){ this.u = u;}
  public getCurrentUser(){return Observable.of(this.u);}
  public setUrls(){}
  public clearUrls(){}
} 
export class MockUserService {
  user: MockUser;
  public userLogon(x:MockUser){this.user = x;}
}
export class MockStore {

}
export class MockUser {
  id: string="";
  email: string="";
  firstName: string="";
  lastName: string="";
  token: string="";
  roles: string[];
  expires: string="0";
  //public isAuthenticated: boolean=false;
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
    //if(user.hasOwnProperty("isAuthenticated")) this.isAuthenticated = user.isAuthenticated;
    if(user.hasOwnProperty("lastLogin")) this.lastLogin = user.lastLogin;
  }
}
export class MockConfigService {
  public config: any={};
  public get(key:any){return this.config[key];}
  public getAll(){return this.config};
  public load(data){this.config = data;}

}


export class MockLocalStorage  {
      isAuthenticated(){}
      getItem(){}
      setCurrentAuthenticatedUserFromJson(){};
      setCurrentUser(){};
      currentUser:Observable<User>;
      removeCurrentUser(){};
      getCurrentUser(){
        let mockUser = new User();
        mockUser.id = '111';
        mockUser.email = 'profileLogout@test.com';
        //mockUser.isAuthenticated = true;
        mockUser.token.token = "ABCDEF";
        mockUser.lastName = "testLastName";
        mockUser.firstName = "testFirstName";
        return Observable.of(mockUser);
      }
}
export class MockServerAuthenticationService{
  authenticateToServer(){}
  registerToServer(){}
  deAuthenticateToServer(){}

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

export class MockRouter {
  navigate(){}
}
export class MockUserEvent{
  on (){ return Observable.of({a:1});}
  fire(){}
}
export class MockUrlEvent{
  on (){ return Observable.of({a:1});}
}
export class MockUrlService{
  public constructor(){console.log("mockUrlService ctor");}
  public loadItems(){console.log("mockUrlServer.loadItems");}
  public clearUrls(){console.log("mockUrlServer.clearUrls");}
}
export class MockActivatedRoute {
  queryParams = {
    subscribe: jasmine.createSpy('subscribe')
     .and
     .returnValue(Observable.of(<Params>{id: 1}))
  }
}

export function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

let url1 = new Url();
url1.id = "1";
url1.title = url1.id;
url1.url = "http://test1.com";

let url2 = new Url();
url2.title = url2.id;
url2.id = "2";
url2.url = "http://test2.com";

export class MockData {


  static UrlList(){

    let urlList: Url[]=[];

    urlList.push(url1);
    urlList.push(url2);
    return urlList;
  }

}