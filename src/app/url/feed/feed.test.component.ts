import { Component, Input, Output, NgModule, OnChanges, ModuleWithProviders, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { FeedService }  from './feed.service';
import { User } from '../../user';

@Component({
  selector: 'feed-test',
  template: `
   <span>feed-test<span>
<form [formGroup]="testForm" (submit)="save()">
      <input id="url" type="text" formControlName="url" placeholder="Add a url" />
      <button type="submit">Add</button>
  </form>
      <hr>
<!--
      <div *ngFor="let item of items">
              <div >{{item}}</div>
        </div>
        
-->
  <div> {{ results }}</div>

  `,
  providers: [FeedService]
})
export class FeedTestComponent  implements OnChanges{
  

  @Input() user: User;
  testForm: FormGroup;
  results:any;
  //httpUrlValue: AbstractControl;

  //url: string;
  items: Observable<string[]>;

  constructor(
    private feedService: FeedService,
    //private builder: FormBuilder
    ){
      this.testForm = new FormGroup({
       url: new FormControl()
    });
      //this.httpUrlValue = this.testForm.controls['httpUrlValue'];
    }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

    }
  }
  ngOnInit(){
  }
  save(){
    let url = this.testForm.controls["url"].value;
    console.log("saved " + url);
    
    
    //let results = this.feedService.getFeed(url, this.user);
    
    console.log("after getFeed2 " );
  }
}
