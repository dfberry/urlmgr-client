//http://embed.plnkr.co/uVGOm8yA0zA0OKhgWpvq/
// upgraded from ng 2

//http://localhost:3000/#/urls/tags/public/

import { Input, ElementRef, OnInit, OnDestroy, Directive, Component, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { TagService } from './tag.service';
import { ConfigService } from '../../config/config.service';
import * as $ from 'jquery';

@Component({
	selector: 'tag-public-all',
	template: `
	<h1>All Tags</h1>
  <div class="tags list"
  *ngFor="let tag of tags"
  >
  {{tag | json}}
  </div>	
  <hr>
  <div cloud>hello</div>
  <hr>
  <div class="cloud"></div>
  `,
  providers:[/* directives */],
  styleUrls: [
    '../../../../node_modules/jqcloud2/dist/jqcloud.css'
  ]
})
export class TagsAllComponent {
  
  tags: any[]=[];
  config: any;

  options: any = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width : 1000,
    height : 400,
    overflow: false,
  }

  data: Array<any> = [
    {text: 'Weight-10-link-color', weight: 10, link: 'https://google.com', color: '#ffaaee'},
    {text: 'Weight-10-link', weight: 10, link: 'https://google.com'},

  ];
  words = [
    {text: "Lorem", weight: 13},
    {text: "Ipsum", weight: 10.5},
    {text: "Dolor", weight: 9.4},
    {text: "Sit", weight: 8},
    {text: "Amet", weight: 6.2},
    {text: "Consectetur", weight: 5},
    {text: "Adipiscing", weight: 5}
  ];

  public constructor(
    private tagService: TagService,
    private configService: ConfigService
  ){
    this.config = this.configService.getAll();
    console.log("config");
    console.log(this.config);


    console.log($().jQCloud);


  }

  ngOnInit() {
    $('.cloud').jQCloud([
      {text: "Lorem", weight: 13},
      {text: "Ipsum", weight: 10.5},
      {text: "Dolor", weight: 9.4},
      {text: "Sit", weight: 8},
      {text: "Amet", weight: 6.2},
      {text: "Consectetur", weight: 5},
      {text: "Adipiscing", weight: 5}
    ], {
      width: 500,
      height: 350
      });
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
