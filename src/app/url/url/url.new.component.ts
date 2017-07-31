import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges, DoCheck, KeyValueDiffers} from "@angular/core";
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { User } from '../../user';
import { IUrl, Url } from './url.model';
import { UrlEvent } from './url.event';
import { UrlService } from './url.service';

import { TagInputComponent, TagInputItemComponent} from '../tags'
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


      <tag-input
        placeholder="Add a tag"
        [(ngModel)]="tags"
        delimiterCode="188"
        (onTagListChanged)='onTagListChanged($event)'
        [ngModelOptions]="{standalone: true}"
        >
      </tag-input>


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
  tags: string[];

  constructor(
      private urlService: UrlService, 
      private builder: FormBuilder,
      private differs: KeyValueDiffers
      //private feedService: FeedService
    ){

    this.newForm = this.builder.group({
      httpUrlValue: ['', Validators.compose([Validators.required, this.checkIfUrl])]
    });
    this.httpUrlValue = this.newForm.controls['httpUrlValue'];
  }
  ngOnInit() {
      //console.log("dt.component UrlNewComponent ngOnInit input this.user " + JSON.stringify(this.user));
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      //console.log(`dt.component::UrlNewComponent - ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  validForm(){
    if(this.httpUrlValue.valid) return true;
  }

  save(){
    if (this.validForm()){

      this.url.url = this.httpUrlValue.value;
      this.url.tags = this.tags;

      if(!this.url || !this.url.url || !this.user.id || !this.user.token){
        console.log("can't save url");
        throw ("can't save url");
      }

    this.getUrlProperties(this.url.url, this.user)
      .then(properties => {
        
        if(properties && properties["feed"]) this.url["feeds"] = properties["feed"];
        if(properties && properties["title"]) this.url["title"] = properties["title"];

        return this.insertItem(this.user, this.url);
      }).then( newUrl => {
        console.log("save url = " + JSON.stringify(newUrl));
        return newUrl;
      }).catch(error => console.log(error));

    }
  }
  insertItem(user, url){
    return this.urlService.insertItem(user, url)
      .then(data => {
        console.log("insertItem data = " + JSON.stringify(data));
        return data;
      }).catch(err => {
        console.log("new url, insertItem err " + JSON.stringify(err));
        throw (err);
      });
  }

  getUrlProperties(url, user){
    return this.urlService.getUrlProperties(url, user)
    .then(properties => {
      return properties;
    }).catch(err => {
      console.log("new url, getUrlProperties err " + JSON.stringify(err));
      return {}; 
    });
  }
  // valid url
  checkIfUrl(fieldControl: FormControl){
      let thisUrl = fieldControl.value;
      //console.log('UrlNewComponent::checkValidUrl ' + thisUrl);

      let isValid = validUrl.isUri(thisUrl);
      //console.log(thisUrl + " isValid = " + isValid);
      return isValid ? null : { invalidUrl: true }; 
  }
  onTagListChanged(list) {
    console.log("UrlNewComponent onTagListChanged");
    this.tags = list;
    console.log("UrlNewComponent tags = " + JSON.stringify(this.tags));
  }
}