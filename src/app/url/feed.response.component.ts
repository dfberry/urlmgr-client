import { Component, Input, Output, NgModule, ModuleWithProviders, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import { Feed, FeedDefinition, FeedResponse, Article, FeedInfo} from './feed.model';
import { FeedResponseService } from './feed.response.service';
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
  providers: [FeedResponseService]
})
export class FeedResponseComponent {
  found: boolean;
  url: string;
  urlId: string;
  selectedFeed: Feed = new Feed();

  constructor(
    private feedResponseService: FeedResponseService,
    private route: ActivatedRoute){
      this.found = false;
    }

  ngOnInit(){
    this.urlId = this.route.snapshot.params['id'];
    this.url = this.route.snapshot.params['url'];

    if (this.url && this.urlId){
      this.selectedFeed = new Feed();
      this.feedResponseService.addFeed(this.urlId, this.url);
    }
    // get out of state
    //this.store.select(state => state.selectedFeed)
     // .distinctUntilChanged()
    //  .subscribe(data => this.onFeedsEmitted(data));
      /*
    this.store.select(state => state.selectedFeed)
      .distinctUntilChanged()
      .subscribe(data => this.onSelectedFeedEmitted(data));
      */
  }
  public onFeedsEmitted(data:Feed){
    this.selectedFeed = data;
    this.found = true;
  }
  
}
