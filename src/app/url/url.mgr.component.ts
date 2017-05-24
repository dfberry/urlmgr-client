import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { IUrl, Url } from './url';
import { User } from '../user';

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

  constructor(){}

}
