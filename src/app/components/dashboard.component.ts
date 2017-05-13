import { Component} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { UserEvent, User } from '../user';

import { UrlEvent } from '../url/url/url.event';
import { UrlService} from '../url/url/url.service';
import { Url } from '../url/url/url.model';

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
   <!--dashboard begin -->
   <url-mgr-component [urls]="urls" [user]="user"></url-mgr-component>
   <!--dashboard end -->
  `
})
export class DashboardComponent {

  urls: Url[];
  user: User;

  constructor(
    private store: Store<AppState>,
    private userEvent: UserEvent,
    private urlEvent: UrlEvent,
    private urlService: UrlService    
  ){}
  ngOnInit(){
    this.registerUrlBroadcast();
    this.store.select(state => state.user)
      .distinctUntilChanged()
      .subscribe(user => {
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

    // so has user and isn't a clear action


  }
  clearUrls(){
    this.store.dispatch({type: UrlActions.URL_CLEAR, payload: []});
  }
  loadUrls(){
    this.urlService.loadItems(this.user).then(urls => {
      this.urls = urls;
      this.store.dispatch({type: UrlActions.URL_ADD_N, payload: urls});
    }).catch(err => {
      console.log("dashboard::onUrlEvent - error = " + JSON.stringify(err));
    });
  }
  registerUrlBroadcast() {
    this.userEvent.on()
      .subscribe(message => {
        this.onUrlEvent(message);
      });
  }
}