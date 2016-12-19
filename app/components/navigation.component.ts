import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUrl, Url, AppState, ADD_URL, UrlService } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
/**************************************************************************
 * 
 * Show Feeds for Url
 * 
 * 
*/
@Component({
  selector: 'navigation',
  template: `
    <span>NAVIGATION<span>
    <div>
        <a routerLink="/feed" routerLinkActive="active">Feeds</a> | <a routerLink="/url" routerLinkActive="active">Urls</a>
    </div>
  `
})
export class NavigationComponent {

  constructor(private store: Store<AppState>){}
  ngOnInit(){
    console.log("NavigationComponent::ngOnInit " );
  }
}