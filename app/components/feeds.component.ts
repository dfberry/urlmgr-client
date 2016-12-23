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

  constructor(
    private feedResponseService: FeedResponseService, 
    private store: Store<AppState>){}

  ngOnInit(){
    console.log("UrlMgrComponent ngOnInit");

    this.store.select(state => state.feeds)
      .distinctUntilChanged()
      .subscribe(data => this.onUrlsEmitted(data));
  }
  // executed once user data arrives from the store
  public onUrlsEmitted(data:Feed[]){
    this.feeds = data;
    this.printOutState("feeds", this.feeds);
  }

    // DEBUG
    private printOutState(arrName:string, arr: Feed[]){
        for(let i =0; i < arr.length; i++){
            console.log("app.component " + arrName + " " + i + " = " + JSON.stringify(arr[i]));
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
        <span >{{feed.feedDefinition | json}}</span>
        <span >{{feed.feedResponse | json}}</span>
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
    if (this.feeds) console.log(this.feeds.length);
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
   <div *ngFor="let item of feeds">
          <div ><a href="{{item.url}}" > {{item.title}}</a></div>
          <div >{{item.parentId}}</div>
    </div>

  `,
  providers: [FeedResponseService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FeedResponseComponent {
  
  // id from state.urls
  urlId: string;

  // url associated with feed articles,
  // not main website 
  feedUrl: string;

  // store

  constructor(
    private store: Store<AppState>,
    private feedResponseService: FeedResponseService,

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

      this.feedResponseService.loadItems(this.urlId, this.feedUrl);

    // get out of state
    
    //this.store.select(state => state.feeds)
    //  .distinctUntilChanged()
    //  .subscribe(data => this.onFeedsEmitted(data));
    //}
    }

  }

  // executed once user data arrives from the store
  
  public onFeedsEmitted(data:any[]){
    console.log("feed mgr onFeedsEmitted");
    //this.feeds = data;
    console.log("feed mgr to this.feeds");
    //this.printOutState("feeds", this.feeds);
  }
  
  private printOutState(arrName:string, arr: any[]){
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
    this.getFirstFeedUrl();

  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`UrlFeedDetailComponent::ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
    
  }
  getFirstFeedUrl(){
    console.log("feed component::getFirstFeedUrl ");
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
