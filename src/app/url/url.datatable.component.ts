import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges, DoCheck, KeyValueDiffers} from "@angular/core";
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { User } from '../user/user.model';

/****************************************************************
 * 
 *  angular2 data table: https://www.npmjs.com/package/angular2-datatable
 * 
 * 
 */
@Component({
  selector: 'url-datatable',
  template: `
  url-datatable
<div class="container-fluid">
    <div class="col-xs-12 col-md-10 col-lg-8 ">

        <div class="page-header">
        </div>

        <div class="row">
            <h2 class="col-xs-10">Urls</h2>
            <div class="col-xs-2">
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

            <table class="table table-striped" 
                    [mfData]="rows | dataFilter : filterQuery" 
                    #mf="mfDataTable"
                   [mfRowsOnPage]="rowsOnPage" 
                   [(mfSortBy)]="sortBy" 
                   [(mfSortOrder)]="sortOrder">
                <thead>
                <tr>
                    <th colspan="5">
                        Filter by name:
                        <input class="form-control" [(ngModel)]="filterQuery"/>
                    </th>
                </tr>
                <tr  class="panel-heading">
                    <th colspan="1"></th>
                    <th colspan="4">
                        <mfDefaultSorter by="status">Status</mfDefaultSorter>
                    </th>
                </tr>

                </thead>
                <tbody>
                <tr *ngFor="let item of mf.data">
                    <td>
                        <url-remove [user]="user" [url]="item">x</url-remove>
                    </td>
                    <!--
                    <td>{{ item.createdAt | date:"MM/dd/yy" }}</td>
                    <td><url-feed-detail-link [url]="item"></url-feed-detail-link></td>
                    -->
                    <td>
                    <a href='{{item.url}}'>{{ item | feedParser:"title":1 }}</a>
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrlDataTableComponent  implements OnChanges {
    
    @Input() rows: any[];
    @Input() user: User;

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

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

      //console.log(`dt.component::angular2DataTableComponent - ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

}
