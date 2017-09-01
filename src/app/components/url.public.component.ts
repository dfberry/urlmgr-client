import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges, DoCheck, KeyValueDiffers } from "@angular/core";
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Url, UrlService } from '../url';

/****************************************************************
 * 
 *  angular2 data table: https://www.npmjs.com/package/angular2-datatable
 * 
 * 
 */
@Component({
    selector: 'url-public-list',
    template: `
        <div class="outer" *ngIf="urls">
            <h3>What I'm reading now</h3>
            <div class="public-list-items" *ngFor="let item of urls">
                <a href='{{item.url}}'>{{ item.title }} - {{item.added}}</a>
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
export class UrlPublicListComponent {

    urls: any[];

    constructor(private urlService: UrlService) { }

    ngOnInit() {
        this.urlService.loadPublicItems().subscribe( data => {
            
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