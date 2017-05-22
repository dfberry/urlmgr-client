import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { RouterModule, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/toArray';

import { IUrl, Url } from './url/url.model';
import { User } from '../user';

let validUrl = require('valid-url');

/**************************************************************************
 * 
 * Show Url list
 * 
 * 
*/
@Component({
  selector: 'url-mgr-component',
  template: `
    <url-datatable [user]="user" [rows]="urls"></url-datatable>
  `,
  styles:[`
    div { width: 100%; }
    .styledurls { background-color: #ffb3b3; }
  `]
})
export class UrlMgrComponent {

  @Input() urls: Url[];
  @Input() user: User;

  constructor(
    //private urlService: UrlService
    //, private store: Store<AppState>
    //private feedService: FeedService
    ){

    }

  ngOnInit(){
    //console.log("url component ngOnInit");
    
    /*
    this.store.select(state => state.urls)
      .distinctUntilChanged()
      .subscribe(data => this.onUrlsEmitted(data));
    
  
    this.store.select(state => state.user)
      .distinctUntilChanged()
      .subscribe(data => this.onUserEmitted(data));
      */
      //this.feedService.getFeedLinkFromHtml('<h2 class="title">Hello world</h2>');
  }
  // executed once user data arrives from the store
  //public onUrlsEmitted(data:Url[]){
  //  this.urls = data;
  //}
  /*public onUserEmitted(user:User){
    console.log("urls.onUserEmitted");

    this.user = user;
    this.urlService.loadItems(user);

    console.log("urls.component onUserEmitted = " + JSON.stringify(user));
    console.log("urls.component onUserEmitted, this.user = " + JSON.stringify(this.user));

    // get out of state

  }*/

    // DEBUG
    private printOutState(arrName:string, arr: Url[]){
        for(let i =0; i < arr.length; i++){
            //console.log("app.component " + arrName + " " + i + " = " + JSON.stringify(arr[i]));
        }
    }
  
  ngOnChanges(changes: SimpleChanges) {
    
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      //console.log(`UrlMgrComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
}
