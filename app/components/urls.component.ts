import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUrl, Url, AppState, ADD_URL, UrlService } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';


let validUrl = require('valid-url');



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
    console.log("UrlListComponent::ngOnInit - urls.length = " + this.urls.length);
  }
  ngOnChanges(changes: SimpleChanges) {
  for (let propName in changes) {
    let chng = changes[propName];
    let cur  = JSON.stringify(chng.currentValue);
    let prev = JSON.stringify(chng.previousValue);

    console.log(`UrlListComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  }
}
}
/**************************************************************************
 * 
 * Show Url list
 * 
 * 
*/
@Component({
  selector: 'url-mgr',
  template: `
    <angular2DataTable [rows]="urls"></angular2DataTable>
  `,
  styles:[`
    div { width: 100%; }
    .styledurls { background-color: #ffb3b3; }
  `],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UrlMgrComponent {
//angular2DataTable
//<bootstrapDataTable [rows]="urls" ></bootstrapDataTable>
  @Input() urls: Url[];

  constructor(){}
  ngOnInit(){
  }
  /*
  ngOnChanges(changes: SimpleChanges) {
    
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`UrlMgrComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }*/
}