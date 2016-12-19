import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges} from "@angular/core";
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUrl, Url, AppState, ADD_URL, UrlService } from '../../../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

let validUrl = require('valid-url');
/**************************************************************************
 * 
 * Insert New Url
 * 
 * 
*/
@Component({
  selector: 'url-new',
  template: `
  <form [formGroup]="newForm" (submit)="save()">
      <input id="httpUrlValue" type="text" formControlName="httpUrlValue" placeholder="Add a url" />
      <div *ngIf="(!httpUrlValue.valid && !httpUrlValue.pristine)">
        <p *ngIf="httpUrlValue.hasError('required')">httpUrlValue is required</p>
        <p *ngIf="httpUrlValue.hasError('invalidUrl')">Url is not valid</p>
      </div>
      <button type="submit" [disabled]="!newForm.valid">Add</button>
  </form>
  <!--
   <pre> newForm.value = {{ newForm.value | json }} </pre>
   <pre> httpUrlValue.valid = {{ httpUrlValue.valid }} </pre>
  <div>Valid ={{httpUrlValue.valid}}</div>
        <div>Pristine ={{httpUrlValue.pristine}}</div>
        <div>Touch ={{httpUrlValue.touched}}</div>
  -->
  `,
  providers: []
})
export class UrlNewComponent {
  //name:string = '';
  //itemtype:string = "Url";

  newForm: FormGroup;
  url: Url = new Url();
  httpUrlValue: AbstractControl;


  constructor(private urlService: UrlService, private builder: FormBuilder){
    console.log('UrlNewComponent::constructor');
    this.newForm = this.builder.group({
      httpUrlValue: ['', Validators.compose([Validators.required, this.checkIfUrl])]
    });
    this.httpUrlValue = this.newForm.controls['httpUrlValue'];
  }
  ngOnInit() {
      console.log("UrlNewComponent ngOnInit");
  }

  validForm(){
    console.log("validForm this.httpUrlValue.valid = " + this.httpUrlValue.valid);
    if(this.httpUrlValue.valid) return true;
  }

  save(){
    if (this.validForm()){
      console.log('UrlNewComponent::save');
      this.url.url = this.httpUrlValue.value;

      console.log('this.url ' + JSON.stringify(this.url));

      // insert new url name via service
      this.urlService.insertItem(this.url)
      .then(data => console.log("save data = " + JSON.stringify(data)))
      .catch(err => console.log("save err = " + JSON.stringify(err)));
    }
  }
  // valid url
  checkIfUrl(fieldControl: FormControl){
      let thisUrl = fieldControl.value;
      console.log('UrlNewComponent::checkValidUrl ' + thisUrl);

      let isValid = validUrl.isUri(thisUrl);
      console.log(thisUrl + " isValid = " + isValid);
      return isValid ? null : { invalidUrl: true }; 
    }

}
/**************************************************************************
 * 
 * Remove Url
 * 
 * 
*/
@Component({
  selector: 'url-remove',
  template: `
    <button (click)="remove(url)" class="btn btn-danger">x</button>
  `,
  providers: []
})
export class UrlRemoveComponent {
@Input() url: Url;

  constructor(private urlService: UrlService, private builder: FormBuilder){}

  remove(){
    if (this.url.id){
      console.log('UrlNewComponent::remove');
      this.urlService.removeItem(this.url);
      //.then(data => console.log("save data = " + JSON.stringify(data)))
      //.catch(err => console.log("save err = " + JSON.stringify(err)));
    }
  }
}
/****************************************************************
 * 
 *  angular2 data table: https://www.npmjs.com/package/angular2-datatable
 * 
 * 
 */
@Component({
  selector: 'angular2DataTable',
  template: `
<div class="container-fluid">
    <div class="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">

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
            <div class="panel-heading"><url-new></url-new></div>

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
                    <th style="width: 10%"></th>
                    <th style="width: 20%">
                        <mfDefaultSorter by="createdAt">Date added</mfDefaultSorter>
                    </th>
                    <th style="width: 10%">
                        <mfDefaultSorter by="feeds">feed</mfDefaultSorter>
                    </th>
                    <th style="width: 40%">
                        <mfDefaultSorter by="status">Status</mfDefaultSorter>
                    </th>
                    

                    <!--
                    <th style="width: 20%">
                        <mfDefaultSorter [by]="sortByWordLength">Feeds Json</mfDefaultSorter>
                    </th>
                    -->
                </tr>

                </thead>
                <tbody>
                <tr *ngFor="let item of mf.data">
                    <td>
                        <url-remove [url]="item">x</url-remove>
                    </td>
                    <td>{{ item.createdAt | date:"MM/dd/yy" }}</td>
                    <td><url-feed-detail-link [url]="item"></url-feed-detail-link></td>
                    <td>
                    <a href='{{item.url}}'>{{ item | feedParser:"title":1 }}</a>
                    <!--
                    {{ item.feeds | json }}
                    -->
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
  `
})
export class angular2DataTableComponent {
    
    @Input() rows: any[];
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

  constructor(){}
  ngOnInit(){
      console.log("dataTable");
  }
  ngOnChanges(changes: SimpleChanges) {}

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

}
