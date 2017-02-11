import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({name: 'firstFeed'})
export class FirstFeedPipe implements PipeTransform {
 
    transform(items: any[]): any {
        //console.log("FirstFeedPipe: transform");
        return JSON.stringify(items);
        /*return items.filter(item => {
            //console.log("FirstFeedPipe: return");
          if(item && item.feeds && item.feed.length>0){
              //console.log("FirstFeedPipe: " + item.feeds[0].href)
            return item.feeds[0].href;
          }
        });*/      
    }
}