import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges, DoCheck, KeyValueDiffers } from "@angular/core";
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router'; 
import { Url, UrlService } from '../url';

/****************************************************************
 * 
 *  angular2 data table: https://www.npmjs.com/package/angular2-datatable
 * 
 * 
 */
@Component({
    selector: 'tag-public-list-filter',
    template: `
        <div *ngIf="tag" class="outer">
            <h3>{{tag}}</h3>
            <div class="public-list-items" *ngFor="let item of urls">
                - <a href='{{item.url}}'>{{ item.title }}</a>
            </div>
        <div>


  `,
  styles:[`
        .public-list-title {
            
        }
        .public-list-items {
            
        } 
          `
    ]
})
export class TagListComponent {

    tag: string="";
    urls: any[];

    constructor(
      private urlService: UrlService,
      private activatedRoute: ActivatedRoute 
    ) { 

      if(activatedRoute && 
        activatedRoute.snapshot && 
        activatedRoute.snapshot.queryParams && 
        activatedRoute.snapshot.queryParams["tag"]
      ) {
            this.tag = decodeURI(activatedRoute.snapshot.queryParams["tag"]);
            console.log(this.tag);
        }
    }

    ngOnInit() {

        this.urlService.loadUrlsByTag([this.tag]).subscribe( data => {
            
            if(data && Array.isArray(data.urls) && data.urls.length>0){
                this.urls = data.urls;
                console.log(data.urls);
                console.log(this.urls);
            } 
            
        });
     }
    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let chng = changes[propName];
            let cur = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);

            //console.log(`ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        }
    }

}