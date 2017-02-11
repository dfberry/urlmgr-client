import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUrl, Url, AppState, ADD_URL, UrlService } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { ConfigService } from '../services/index';
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
   <url-mgr></url-mgr>
   <!--dashboard end -->
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent {
  constructor(private store: Store<AppState>){}
  ngOnInit(){
    //console.log("UrlFeedDetailComponent::ngOnInit " );
  }
  ngOnChanges(changes: SimpleChanges) {
    
  }
}