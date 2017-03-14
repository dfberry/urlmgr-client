export class User {
  id: string="";
  email: string="";
  firstName: string="";
  lastName: string="";
  token: string="";
  roles: string[];
  expires: string="0";
  isAuthenticated: boolean=false;
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