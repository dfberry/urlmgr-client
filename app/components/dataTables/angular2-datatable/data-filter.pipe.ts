let _ = require("lodash");
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter"
})
export class DataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.url.indexOf(query) > -1);
        }
        return array;
    }
}

@Pipe({
    name: "feedParser"
})
export class FeedParserPipe implements PipeTransform {

    feedPropertyTitle(temp: string){
        if (temp.includes(' - Atom')){
            return temp.replace(/ - Atom/ig, "");
        } else if (temp.includes(' - Rss')){
            return temp.replace(/ - Rss/ig, "");
        } else {
            return temp;
        }
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

    transform(feedJson: any[], feedProperty: string, arrNum: number): any {

        switch (feedProperty){
            case 'found': // feed found == true?
                // assumes if feeds is there then it must have children

                let feedsFound  =  (feedJson && feedJson.length>0) ? true : false;
                console.log("feedsFound = " + feedsFound);
                return feedsFound;
            case 'title':
                let current = this.feedProperty(feedJson, arrNum, feedProperty);
                let newTitle = this.feedPropertyTitle(current);
                newTitle = !newTitle ? '<null>' : newTitle;
                console.log('pipe title = ' + newTitle);
                return this.feedPropertyTitle(newTitle);
            case 'href':
                let href = this.feedProperty(feedJson, arrNum, feedProperty);
                console.log('pipe href = ' + href);
                return href;
            default:
                console.log('returned nothing from data-filter.pipe');
                return;
        }

    }
}