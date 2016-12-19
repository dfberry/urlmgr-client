import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUrl, Url, AppState, ADD_URL, UrlService, Feed, FeedService, FeedResponse, FeedEntry, FeedInfo, FeedMgr } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

/**************************************************************************
 * 
 * Show Feeds for Url
 * 
 * 
*/
@Component({
  selector: 'feed-mgr',
  template: `
   <span>feed-mgr<span>
   <div *ngFor="let item of feeds">
          <div ><a href="{{item.url}}" > {{item.title}}</a></div>
          <div >{{item.parentId}}</div>
    </div>

  `,
  providers: [FeedService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FeedMgrComponent {
  
  // id from state.urls
  urlId: string;

  // url associated with feed articles,
  // not main website 
  feedUrl: string;

  // store
  feeds: FeedMgr[];

  constructor(
    private store: Store<AppState>,
    private feedService: FeedService,

    // to get param out of query string 
    private route: ActivatedRoute){

    }

  ngOnInit(){
    console.log("FeedMgrComponent::ngOnInit " );
    this.urlId = this.route.snapshot.params['id'];
    this.feedUrl = this.route.snapshot.params['url'];

    if (this.feedUrl && this.urlId){
      console.log("feedUrl this.urlId = " + this.urlId);
      console.log("feedUrl this.feedUrl = " + this.feedUrl);

      this.feedService.loadItems(this.urlId, this.feedUrl);

    // get out of state
    this.store.select(state => state.feeds)
      .distinctUntilChanged()
      .subscribe(data => this.onFeedsEmitted(data));
    }

  }
  // executed once user data arrives from the store
  public onFeedsEmitted(data:FeedMgr[]){
    console.log("feed mgr onFeedsEmitted");
    this.feeds = data;
    console.log("feed mgr to this.feeds");
    //this.printOutState("feeds", this.feeds);
  }
  private printOutState(arrName:string, arr: FeedMgr[]){
    for(let i =0; i < arr.length; i++){
        console.log("app.component " + arrName + " " + i + " = " + JSON.stringify(arr[i]));
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`FeedMgrComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
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

    if(!this.url) console.log("UrlFeedDetailLinkComponent url input is empty");

    this.feedTitle = this.url.title;

    //console.log("UrlFeedDetailComponent::ngOnInit - feeds.length = " + this.url.feeds.length);
    if (this.url && this.url.feeds && this.url.feeds.length>0) {
      this.feedUrl = this.url.feeds[0].href;
    } 
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`UrlFeedDetailComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
    
  }
}
