//http://embed.plnkr.co/uVGOm8yA0zA0OKhgWpvq/
// upgraded from ng 2

import {Component, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {TagInputComponent} from './tag.input.component';

@Component({
	selector: 'tag-main',
	template: `
	<h1>Tag Input Example</h1>
	
	<h2>Basic Example</h2>
  <tag-input
    placeholder="Add an tag"
    [(ngModel)]="settings.tags"
    delimiterCode="188"
    (onTagListChanged)='onTagListChanged($event)'
    >
  </tag-input>
  
  <br><br><br>
	<!--
	<h2>Example with email validation</h2>
  <tag-input
    placeholder="Add an email"
    [allowedTagsPattern]="validEmailPattern"
    [(ngModel)]="settings.recipients"
    delimiterCode="188"
    (onTagListChanged)='onTagListChanged($event)'>
  </tag-input>
  -->
  <br><br><br>
	`
})
export class TagMainComponent {
  
  public validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  public constructor(private cd: ChangeDetectorRef){

  }

  public settings = {
    recipients: [],
    tags: ['one', 'two', 'three']
  };

  ngOnChanges(changes: SimpleChanges) {
    //console.log("feeds.component.ts::FeedListComponent - ngOnChanges");
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`TagMainComponent ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  
  }
  onTagListChanged(list) {
    console.log("TagMainComponent onTagListChanged");
    console.log("TagMainComponent list = " + JSON.stringify(list));
    this.settings.tags = list;
    this.cd.markForCheck();
    console.log("TagMainComponent settings = " + JSON.stringify(this.settings));
  }

}
