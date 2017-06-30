import { Component} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { UserEvent, User } from '../user';
import { UrlEvent, UrlService, Url } from '../url';
import { AppState, UrlActions, UserActions } from '../app.state';

/**************************************************************************
 * 
 * Show Dashboard
 * 
 * 
*/
@Component({
  selector: 'dashboard',
  template: `
   <div class="dashboard">
      <url-mgr-component [urls]="urls" [user]="user"></url-mgr-component>
   </div>
  `
})
export class DashboardComponent {

  urls: Url[]=[];
  user: User = new User();

  constructor(
    private userEvent: UserEvent,
    private urlEvent: UrlEvent,
    private urlService: UrlService,
    private appState: AppState    
  ){}
  ngOnInit(){
    this.registerUrlBroadcast();

    this.appState.getCurrentUser()
    .distinctUntilChanged()
    .subscribe(user => {
      console.log("dashboard user changed");
      this.onUserChange(user);
    });
  }
  public onUserChange(user:User){
    this.user = user;
    this.onUrlEvent();
  }
  public onUrlEvent(urlAction?){

    // if no user or any state object's action is clear  
    if(!this.user || !this.user.email) {
      this.clearUrls();
    } else {
      this.loadUrls();
    }
  }
  clearUrls(){
    this.urls = [];
    this.appState.clearUrls();
  }
  loadUrls(){
    
    if(!this.user) return;

    this.urlService.loadItems(this.user).subscribe(data => {
      this.urls = data.urls;
      this.appState.setUrls(this.urls);
    });
  }
  handleErrorObservable(err:any){ 
        return Observable.of(err); 
    }
  registerUrlBroadcast() {
    this.userEvent.on()
      .subscribe(message => {
        this.onUrlEvent(message);
      });
  }
}