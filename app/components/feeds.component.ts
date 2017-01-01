import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUrl, Url, AppState, ADD_URL, UrlService, Feed, FeedDefinitionService, FeedResponseService, FeedResponse,  FeedInfo } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'feed-mgr',
  template: `
    <navigation></navigation>
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

  feeds: Feed[];
  selectedFeed: Feed;

  // id from state.urls
  urlId: string;

  // url associated with feed articles,
  // not main website 
  feedUrl: string;

  constructor(
    private feedResponseService: FeedResponseService, 
    private route: ActivatedRoute,
    private store: Store<AppState>){
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
    this.store.select(state => state.feeds)
        .distinctUntilChanged()
        .subscribe(feeds => this.onEmittedFeeds(feeds));
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
  `],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FeedListComponent {
  @Input() feeds: Feed[];

  constructor(private store: Store<AppState>){}
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


/**************************************************************************
 * 
 * Show Feeds for Url
 * 
 * 
*/
@Component({
  selector: 'feed-response',
  template: `
   <span>feed-response<span>
   <div *ngIf="found">
   <div *ngFor="let item of selectedFeed.feedResponse.items">
          <div ><a href="{{item.link}}" > {{item.title}}</a></div>
    </div>
    </div>

  `,
  providers: [FeedResponseService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FeedResponseComponent {
  found: boolean;
  url: string;
  urlId: string;
  selectedFeed: Feed = new Feed();

  constructor(
    private store: Store<AppState>,
    private feedResponseService: FeedResponseService,
    private route: ActivatedRoute){
      this.found = false;
    }

  ngOnInit(){
    this.urlId = this.route.snapshot.params['id'];
    this.url = this.route.snapshot.params['url'];

    console.log("FeedResponseComponent " + this.urlId);
    console.log("FeedResponseComponent " + this.url);

    if (this.url && this.urlId){
      this.selectedFeed = new Feed();

      console.log("FeedResponseComponent - addFeed");
      this.feedResponseService.addFeed(this.urlId, this.url);
    }
    // get out of state
    this.store.select(state => state.selectedFeed)
      .distinctUntilChanged()
      .subscribe(data => this.onFeedsEmitted(data));
      /*
    this.store.select(state => state.selectedFeed)
      .distinctUntilChanged()
      .subscribe(data => this.onSelectedFeedEmitted(data));
      */
  }
  public onFeedsEmitted(data:Feed){
    this.selectedFeed = data;
    console.log("feed returned");
    this.found = true;
  }
  
}

/**************************************************************************
 * 
 * Show Feed Link - used in datatable
 * 
 * 
*/
@Component({
  selector: 'url-feed-detail-link',
  template: `
    <div *ngIf="feedUrl">
        <a [routerLink]="['/feed', url.id, feedUrl]">{{feedTitle}}</a> 
    </div>
    <div *ngIf="!feedUrl">
       {{feedTitle}}
    </div>
      `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class UrlFeedDetailLinkComponent {
  @Input() url: Url;

  feedUrl: string="";
  feedTitle: string="";
  feedData: any;


  constructor(private store: Store<AppState>){}
  ngOnInit(){

    if(!this.url) {
      //console.log("UrlFeedDetailLinkComponent url input is empty");
    }

    this.feedTitle = this.url.title;
    this.getFirstFeedUrl();

  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      //console.log(`UrlFeedDetailComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
    
  }
  getFirstFeedUrl(){
    //console.log("feed component::getFirstFeedUrl ");
    if (this.url && this.url.feeds && this.url.feeds.length>0) {
      this.feedUrl = this.url.feeds[0].href;
    } 
  }
  /*

  actionsSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('id')
      .map(id => new book.SelectAction(id))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  */

}
