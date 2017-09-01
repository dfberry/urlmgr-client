import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges, DoCheck, KeyValueDiffers} from "@angular/core";
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { User } from '../../user';

/****************************************************************
 * 
 *  angular2 data table: https://www.npmjs.com/package/angular2-datatable
 * 
 * 
 */
@Component({
  selector: 'url-datatable',
  template: `
<div class="container-fluid">
    <div class="col-xs-12 col-md-10 col-lg-8 ">

        <div class="page-header">
        </div>

        <div class="row">
            <h2 class="col-xs-10">Urls</h2>
            <div *ngIf="rows.length>0" class="col-xs-2">
                <label class="label-control">Rows on page</label>
                <select class="form-control input-sm" [(ngModel)]="rowsOnPage">
                    <option [ngValue]="5">5</option>
                    <option [ngValue]="10">10</option>
                    <option [ngValue]="15">15</option>
                </select>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <url-new [user]="user"></url-new>
            </div>

            <table *ngIf="rows.length>0" class="table table-striped" 
                    [mfData]="rows | dataFilter : filterQuery" 
                    #mf="mfDataTable"
                   [mfRowsOnPage]="rowsOnPage" 
                   [(mfSortBy)]="sortBy" 
                   [(mfSortOrder)]="sortOrder">
                <thead>
                <tr>
                    <th>
                        Filter by name:
                        <input class="form-control" [(ngModel)]="filterQuery"/>
                    </th>
                </tr>
                <tr  class="panel-heading">
                    <th></th>
                    <th>
                        <mfDefaultSorter by="title">Title</mfDefaultSorter>
                    </th>
                    <th>
                        Feeds
                    </th>
                </tr>

                </thead>
                <tbody>
                <tr *ngFor="let item of mf.data">
                    <td>
                        <url-remove [user]="user" [url]="item">x</url-remove>
                    </td>
                        
                    <td>
                        <a href='{{item.url}}'>{{ item.title }}</a>
                        <tag-input
                        placeholder="Add a tag"
                        [config]="existingItemConfig"
                        [(ngModel)]="item.tags"
                        delimiterCode="188"
                        (onTagListChanged)='onTagListChanged($event)'
                        [ngModelOptions]="{standalone: true}"
                        >
                      </tag-input>
                    </td>
                    <td>
                        <div *ngFor="let feed of item.feeds; let idx = index;">
                            <a href="{{feed}}">{{idx}} - feed</a>
                        </div>
                    </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colspan="5">
                        <mfBootstrapPaginator [rowsOnPageSet]="[5,10,15]"></mfBootstrapPaginator>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>
<!--
<div *ngIf="user" >user.id = {{user.id}}</div>
<div *ngIf="!user" >user is empty</div>
-->
  `,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrlDataTableComponent  implements OnChanges {
    
    @Input() rows: any[];
    @Input() user: User;

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

    existingItemConfig={"readonly":true,"caller":"UrlDataTableComponent","show":{"input":false},"delete":false};

  constructor(){}
  ngOnInit() {
      //console.log("UrlNewComponent ngOnInit");
      //console.log("dt.component angular2DataTableComponent ngOnInit input this.user " + JSON.stringify(this.user));
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      //console.log(`ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

}
