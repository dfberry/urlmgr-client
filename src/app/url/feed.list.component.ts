import { Component, Input, Output, NgModule, ModuleWithProviders, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { Feed } from './feed.model';

@Component({
  selector: 'feed-list',
  template: `
      <b>Feeds</b>
      <div *ngFor="let feed of feeds">
        <h4>{{feed.feedResponse.feed.title }}</h4>
        <div *ngFor="let item of feed.feedResponse.items">
        <span>{{item.pubDate | date }}</span>
        <span ><a href="{{item.link}}">{{item.title }}</a></span>
        </div>
        <hr>
      </div>
  `,
  styles:[`
    div { width: 100%; }
  `]
})
export class FeedListComponent {
  @Input() feeds: Feed[];

  constructor(){}
  ngOnInit(){
    if (this.feeds) {
      //console.log(this.feeds.length);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    //console.log("feeds.component.ts::FeedListComponent - ngOnChanges");
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      //console.log(`UrlListComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
}