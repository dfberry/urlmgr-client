export class Token {
  id: string="";
  uuid: string="";
  token: string="";
  revoked: boolean=false;
  role: string="";

  public transform(token: any){
    if(!token)return;

    if(token.hasOwnProperty("id")) this.id = token.id;
    if(token.hasOwnProperty("uuid")) this.uuid = token.uuid;
    if(token.hasOwnProperty("token")) this.token = token.token;
    if(token.hasOwnProperty("revoked")) this.revoked = token.revoked;
    if(token.hasOwnProperty("role")) this.role = token.role;
  }
}