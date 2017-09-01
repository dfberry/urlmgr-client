//http://embed.plnkr.co/uVGOm8yA0zA0OKhgWpvq/
// upgraded from ng 2

//http://localhost:3000/#/urls/tags/public/

import { Input, ElementRef, OnInit, OnDestroy, Directive, Component, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { TagService } from '../url/index';
import { ConfigService } from '../config/config.service';

import * as $ from 'jquery';

@Component({
	selector: 'tag-cloud',
	template: `
  <div class="cloud"></div>
  `,
  providers:[/* directives */],
  styleUrls: [
    '../../../node_modules/jqcloud2/dist/jqcloud.css'
  ]
})
export class TagCloudComponent {
  
  tags: any[]=[];
  config: any;

  options: any = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width : 500,
    height : 350,
    overflow: false,
  }

  public constructor(
    private tagService: TagService,
    private configService: ConfigService
  ){
    this.config = this.configService.getAll();
  }

  // no plan to handle updates/refetches at this point
  ngOnInit() {
    
    console.log("AllTagsComponent ngOnInit");

    this.tagService.load(this.config).subscribe( response => {

      if(!response || !response.data || !response.data.tags || (response.data.tags.length===0)) console.log("tag cloud is empty");

      // get weight
      this.tags = this.tagService.prepTagsForCloud(response.data.tags);

      // set data
      $('.cloud').jQCloud(this.tags,this.options);
      
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`AllTagsComponent ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  
  }
}
