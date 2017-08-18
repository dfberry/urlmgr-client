//http://embed.plnkr.co/uVGOm8yA0zA0OKhgWpvq/
// upgraded from ng 2

//http://localhost:3000/#/urls/tags/public/

import {Component, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { TagService } from './tag.service';
import { ConfigService } from '../../config/config.service';

@Component({
	selector: 'tag-public-all',
	template: `
	<h1>All Tags</h1>
  <div class="tags list"
  *ngFor="let tag of tags"
  >
  {{tag | json}}
  </div>	
	
	`
})
export class TagsAllComponent {
  
  tags: any[]=[];
  config: any;

  public constructor(
    private tagService: TagService,
    private configService: ConfigService
  ){
    this.config = this.configService.getAll();
    console.log("config");
    console.log(this.config);
  }

  ngOnInit() {
    console.log("AllTagsComponent ngOnInit");
    this.tagService.load(this.config).subscribe( response => {
      console.log("load returned");
      if(response && response.data && response.data.tags ) this.tags = response.data.tags;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    //console.log("feeds.component.ts::FeedListComponent - ngOnChanges");
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`AllTagsComponent ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  
  }
}
