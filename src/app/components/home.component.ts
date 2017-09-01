import { Component} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { UserEvent, User } from '../user';
import { UrlEvent, UrlService, Url } from '../url';
import { AppState, UrlActions, UserActions } from '../app.state';
import { UrlPublicListComponent } from "./url.public.component";

/**************************************************************************
 * 
 * Show Dashboard
 * 
 * 
*/
@Component({
  selector: 'home',
  template: `
  <contact></contact>
  <tag-cloud></tag-cloud>
  <url-public-list></url-public-list>
  `
})
export class HomeComponent {

  constructor(  ){}
  ngOnInit(){}

}