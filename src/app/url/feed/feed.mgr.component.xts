import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

import { Feed, FeedResponseService } from '../index';

@Component({
  selector: 'feed-mgr-component',
  template: `
    <span>feed-mgr</span>
    
    <feed-list [feeds]="feeds"></feed-list>
  `,
  styles:[`
    div { width: 100%; }
    .styledurls { background-color: #ffb3b3; }
  `],
  providers: [FeedResponseService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FeedMgrComponent {

  @Input() feeds: Feed[];
  @Input() selectedFeed: Feed;

  // id from state.urls
  urlId: string;

  // url associated with feed articles,
  // not main website 
  feedUrl: string;

  constructor(
    private feedResponseService: FeedResponseService, 
    private route: ActivatedRoute){
      this.selectedFeed = new Feed();
      this.feeds = new Array();
    }

  ngOnInit(){
/*
    this.urlId = this.route.snapshot.params['id'];
    this.feedUrl = this.route.snapshot.params['url'];

    if (this.feedUrl && this.urlId){

      // set selectedFeed
      this.feedResponseService.addFeed(this.urlId, this.feedUrl);
      this.store.select(state => state.selectedFeed)
        .distinctUntilChanged()
        .subscribe(selectedFeed => this.onEmitted(selectedFeed));
    }
    */

    // get all feeds
    //this.store.select(state => state.feeds)
    //    .distinctUntilChanged()
    //    .subscribe(feeds => this.onEmittedFeeds(feeds));
  }

  // executed once user data arrives from the store
  //public onEmitted(data:Feed){
  //  this.selectedFeed = data;
    //this.printOutState("feeds", this.feeds);
  //}
  // executed once user data arrives from the store
  public onEmittedFeeds(data:Feed[]){
    this.feeds = data;
    //this.printOutState("feeds", this.feeds);
  }

    // DEBUG
    private printOutState(arrName:string, arr: Feed[]){
        for(let i =0; i < arr.length; i++){
            //console.log("app.component " + arrName + " " + i + " = " + JSON.stringify(arr[i]));
        }
    }
  
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      //console.log(`UrlMgrComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
}








