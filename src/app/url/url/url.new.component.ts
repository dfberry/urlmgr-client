import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges, DoCheck, KeyValueDiffers} from "@angular/core";
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { User } from '../../user';
import { IUrl, Url, UrlEvent, UrlService, FeedService } from '../index';


let validUrl = require('valid-url');

@Component({
  selector: 'url-new',
  template: `  
  <form [formGroup]="newForm" (submit)="save()">
      <input id="httpUrlValue" type="text" formControlName="httpUrlValue" placeholder="Add a url" />
      <div *ngIf="(!httpUrlValue.valid && !httpUrlValue.pristine)">
        <p *ngIf="httpUrlValue.hasError('required')">Url is required</p>
        <p *ngIf="httpUrlValue.hasError('invalidUrl')">Url is not valid</p>
      </div>
      <button type="submit" [disabled]="!newForm.valid">Add</button>
      <!--
      <div *ngIf="user" >user.id = {{user.id}}</div>
      <div *ngIf="!user" >user is empty</div>
      -->
  </form>
  `,
  providers: []
})
export class UrlNewComponent  implements OnChanges{
  //name:string = '';
  //itemtype:string = "Url";
  @Input() user: User;
  
  differ: any;
  newForm: FormGroup;
  url: Url = new Url();
  httpUrlValue: AbstractControl;


  constructor(
      private urlService: UrlService, 
      private builder: FormBuilder,
      private differs: KeyValueDiffers,
      private feedService: FeedService
    ){

    this.newForm = this.builder.group({
      httpUrlValue: ['', Validators.compose([Validators.required, this.checkIfUrl])]
    });
    this.httpUrlValue = this.newForm.controls['httpUrlValue'];
  }
  ngOnInit() {
      console.log("dt.component UrlNewComponent ngOnInit input this.user " + JSON.stringify(this.user));
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`dt.component::UrlNewComponent - ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  validForm(){
    if(this.httpUrlValue.valid) return true;
  }

  save(){
    if (this.validForm()){

      this.url.url = this.httpUrlValue.value;

      if(this.url.url && this.user.id && this.user.token){
        this.urlService.getUrlProperties(this.url.url, this.user)
        .then(properties => {
          
          if(properties["feed"]) this.url["feeds"] = properties["feed"];
          if(properties["title"]) this.url["title"] = properties["title"];

          this.urlService.insertItem(this.user, this.url)
          .then(data => console.log("save data = " + JSON.stringify(data)))
          .catch(err => console.log("save err = " + JSON.stringify(err)));
        }).catch(error => console.log(error));
      }
    }
  }
  // valid url
  checkIfUrl(fieldControl: FormControl){
      let thisUrl = fieldControl.value;
      //console.log('UrlNewComponent::checkValidUrl ' + thisUrl);

      let isValid = validUrl.isUri(thisUrl);
      //console.log(thisUrl + " isValid = " + isValid);
      return isValid ? null : { invalidUrl: true }; 
    }

}