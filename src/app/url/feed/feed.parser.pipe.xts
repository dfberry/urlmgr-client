let _ = require("lodash");

import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "feedParser"
})
export class FeedParserPipe implements PipeTransform {

    // TODO: this is a noop - remove it's use
    feedPropertyTitle(temp: string){

            return temp;

    }

    // validate that feed is valid array and has values
    validFeedAndProperty(temp:any[], arrNum: number, prop: string){
        if(Array.isArray(temp) 
            && temp.length>0  &&  
            temp[arrNum] && 
            temp[arrNum].hasOwnProperty(prop)){
                return true;
        } else {
            return false;
        }
    }

    // get property value
    feedProperty(temp:any[], arrNum:number, prop: string):any{

        arrNum = !arrNum ? 0 : arrNum - 1;

        if (this.validFeedAndProperty(temp, arrNum, prop)){
            return temp[arrNum][prop];
        } else {
            return;
        }
    }

    transform(item:any, feedProperty: string, arrNum: number): any {

        switch (feedProperty){
            case 'found': // feed found == true?
                // assumes if feeds is there then it must have children

                let feedsFound  =  (item.feeds && item.feeds.length>0) ? true : false;
                //console.log("feedsFound = " + feedsFound);
                return feedsFound;
            case 'title':
                if (item.feeds && item.feeds.length>0 ){
                    let current = this.feedProperty(item.feeds, arrNum, feedProperty);
                    let newTitle = this.feedPropertyTitle(current);
                    newTitle = !newTitle ? '<null>' : newTitle;
                    //console.log('pipe title = ' + newTitle);
                    return this.feedPropertyTitle(newTitle);
                } else {
                    //console.log('pipe title from item '  + item.url);
                    return item.url
                }
                
            case 'href':
                let href = this.feedProperty(item.feeds, arrNum, feedProperty);
                //console.log('pipe href = ' + href);
                return href;
            default:
                //console.log('returned nothing from data-filter.pipe');
                return;
        }

    }
}