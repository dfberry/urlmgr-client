import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//http://stackoverflow.com/questions/37992671/how-to-preload-a-config-file-in-angular2
@Injectable()
export class TagService {
 
  public results: any;
  href: any;

  constructor(
    private http: Http,
    private router: Router
  ) {
    this.href = this.router.url;
    console.log(this.href);
  }
  
  load(config) {

      if(!config || !config.apiUrl) return Observable.throw('error constructing api url');

      let url = config.apiUrl + 'tags/all';

      return this.http
      .get(url)
      .map((response: Response) => response.json());

  }
 
  /*
      determine weight
  */
  prepTagsForCloud(tags){
    if(tags && tags.length>0){

      // sort from biggest to smallest count
      // ignoring text of tag 
      tags.sort(function(a,b){
        return  b.count - a.count;
      });

      //if more than 20 items, take top 20 
      //more items doesn't make sense in a tag cloud
      if(tags.length>20) tags = tags.slice(0,19);

      // 20% slice - 5 levels of font size
      let slice = Math.ceil(tags.length / 5) ;
      let sliceWeight = 25;
      let currentSlice = slice;
      
      // right now the link doesn't mean anything because it is all private links
      tags.forEach((tag,index) => {
        
        console.log(tag);
        tag.text = tag.tag;
        
        tag.link = "/#/public/tag-list?tag=" + encodeURI(tag.tag); 
        console.log(tag.link);

        if (index<currentSlice){
          tag.weight = sliceWeight;
        } else {
          currentSlice += slice;
          sliceWeight -= slice;
          tag.weight = sliceWeight;
        }
      });

      return tags;
    } 
  }
}