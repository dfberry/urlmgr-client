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
  selector: 'home',
  template: `
  <tag-cloud></tag-cloud>
  `
})
export class HomeComponent {

  constructor(  ){}
  ngOnInit(){}

}