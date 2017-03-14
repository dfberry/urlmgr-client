import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUrl, Url, ADD_URL, UrlService } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/toArray';
import { AppState } from '../app.state';
import { User } from '../user/user.model';

import { RouterModule, Routes } from '@angular/router';

let validUrl = require('valid-url');

/**************************************************************************
 * 
 * Show Url list
 * 
 * 
*/
@Component({
  selector: 'url-mgr',
  template: `
    <!--url-mgr begin -->
    <angular2DataTable  [rows]="urls"></angular2DataTable>
    <!--url-mgr end -->
  `,
  styles:[`
    div { width: 100%; }
    .styledurls { background-color: #ffb3b3; }
  `],
  providers: [UrlService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UrlMgrComponent {

  urls: Url[];
  user: User;

  constructor(
    private urlService: UrlService, 
    private store: Store<AppState>){

    }

  ngOnInit(){
    console.log("url component ngOnInit");
    /*
    this.store.select(state => state.urls)
      .distinctUntilChanged()
      .subscribe(data => this.onUrlsEmitted(data));
  
    this.store.select(state => state.user)
      .distinctUntilChanged()
      .subscribe(data => this.onUserEmitted(data));
      */
  }
  // executed once user data arrives from the store
  public onUrlsEmitted(data:Url[]){
    this.urls = data;
  }
  public onUserEmitted(user:User){
    console.log("urls.onUserEmitted");
    this.user = user;
    this.urlService.loadItems(user);
    // get out of state

  }

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
