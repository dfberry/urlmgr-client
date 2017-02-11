import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUrl, Url, AppState, ADD_URL, UrlService } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/toArray';

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
    <angular2DataTable [rows]="urls"></angular2DataTable>
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

  constructor(
    private urlService: UrlService, 
    private store: Store<AppState>){}

  ngOnInit(){
    //console.log("UrlMgrComponent ngOnInit");
    // get from http, put in state
    this.urlService.loadItems();

    // get out of state
    this.store.select(state => state.urls)
      .distinctUntilChanged()
      .subscribe(data => this.onUrlsEmitted(data));
  }
  // executed once user data arrives from the store
  public onUrlsEmitted(data:Url[]){
    this.urls = data;
    //this.printOutState("urls", this.urls);
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

/**************************************************************************
 * 
 * Show Individual Url values
 * 
 * 
*/
@Component({
  selector: 'url-detail',
  template: `
    <span >{{url.url}}</span>
    <span >{{url.statusDate | date : mediumDate : '-0800'}}</span>
    <span >{{url.status}}</span>
  `
})
export class UrlItemComponent {
  @Input() url: Url;
}

/**************************************************************************
 * 
 * Show Url list
 * 
 * 
*/
@Component({
  selector: 'url-list',
  template: `

  

    <div class="styledurls">
      <br>
      <b>Urls</b>
      <div *ngFor="let item of urls">
          <url-detail [url]='item'></url-detail>
      </div>
        
    
    <url-new></url-new>  
    </div>
  `,
  styles:[`
    div { width: 100%; }
    .styledurls { background-color: #ffb3b3; }
  `],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UrlListComponent {
  @Input() urls: Url[];

  constructor(private store: Store<AppState>){}
  ngOnInit(){
    //console.log("UrlListComponent::ngOnInit - urls.length = " + this.urls.length);
  }
  ngOnChanges(changes: SimpleChanges) {
  for (let propName in changes) {
    let chng = changes[propName];
    let cur  = JSON.stringify(chng.currentValue);
    let prev = JSON.stringify(chng.previousValue);

    //console.log(`UrlListComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  }
}
}
