import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges, DoCheck, KeyValueDiffers} from "@angular/core";
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { IUrl, Url, UrlService } from '../';
import { User } from '../../user';


/**************************************************************************
 * 
 * Remove Url
 * 
 * 
*/
@Component({
  selector: 'url-remove',
  template: `
    <button (click)="remove(url)" class="btn btn-danger">x</button>
    <!--
    <div *ngIf="user" >user.id = {{user.id}}</div>
    <div *ngIf="!user" >user is empty</div>
    -->
  `,
  providers: []
})
export class UrlRemoveComponent  implements OnChanges{

  @Input() url: Url;
  @Input() user: User;

  constructor(
    private urlService: UrlService, 
    private builder: FormBuilder){}

  remove(){
    if (this.url && this.user && this.user.token){
      //console.log('UrlNewComponent::remove');
      this.urlService.removeItem(this.user, this.url);
      //.then(data => console.log("save data = " + JSON.stringify(data)))
      //.catch(err => console.log("save err = " + JSON.stringify(err)));
    }
  }

  ngOnInit() {
      //console.log("UrlNewComponent ngOnInit");
      //console.log("dt.component UrlRemoveComponent ngOnInit input this.user " + JSON.stringify(this.user));
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      //console.log(`dt.component::UrlRemoveComponent - ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
}
