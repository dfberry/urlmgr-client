import { Component} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { UserEvent } from '../user/user.broadcaster';
import { UrlEvent } from '../url/url.event';

import { AppState, UrlStates, UserStates } from '../app.state';
import { UrlService } from '../url/url.service';

import { User } from '../user/user.model';
import { Url } from '../url/url.model';
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
    console.log("dashboard component ngOnInit");
    this.registerUrlBroadcast();
    this.store.select(state => state.user)
      .distinctUntilChanged()
      .subscribe(user => {
        this.onUserChange(user);
      });
  }
  public onUserChange(user:User){
    console.log("dashboard onUserChange");
    this.user = user;
    this.onUrlEvent();
  }
  public onUrlEvent(urlAction?){
    console.log("dashboard onUrlChange");
    if(!this.user || !this.user.email) {
      // clear all urls because user is logged off

      this.store.dispatch({type: UrlStates.URL_ADD_N, payload: []});
    } 

    this.urlService.loadItems(this.user).then(urls => {
      console.log("dashboard - load urls into state");
      this.urls = urls;
      this.store.dispatch({type: UrlStates.URL_ADD_N, payload: urls});
    }).catch(err => {
      console.log("dashboard::onUrlEvent - error = " + JSON.stringify(err));
    });

  }
  registerUrlBroadcast() {
    this.userEvent.on()
      .subscribe(message => {
        console.log("dashboard url event received");
        this.onUrlEvent(message);
      });
  }
}