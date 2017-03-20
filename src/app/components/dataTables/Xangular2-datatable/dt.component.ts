import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges, DoCheck, KeyValueDiffers} from "@angular/core";
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUrl, Url, ADD_URL, UrlService } from '../../../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { User } from '../../../user/user.model';

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
        <p *ngIf="httpUrlValue.hasError('required')">Url is required</p>
        <p *ngIf="httpUrlValue.hasError('invalidUrl')">Url is not valid</p>
      </div>
      <button type="submit" [disabled]="!newForm.valid">Add</button>
      <!--
      <div *ngIf="user" >user.id = {{user.id}}</div>
      <div *ngIf="!user" >user is empty</div>
      -->
  </form>
  `,
  providers: []
})
export class UrlNewComponent  implements OnChanges{
  //name:string = '';
  //itemtype:string = "Url";
  @Input() user: User;
  
  differ: any;
  newForm: FormGroup;
  url: Url = new Url();
  httpUrlValue: AbstractControl;


  constructor(
      private urlService: UrlService, 
      private builder: FormBuilder,
      private differs: KeyValueDiffers
    ){

    this.newForm = this.builder.group({
      httpUrlValue: ['', Validators.compose([Validators.required, this.checkIfUrl])]
    });
    this.httpUrlValue = this.newForm.controls['httpUrlValue'];
  }
  ngOnInit() {
      console.log("dt.component UrlNewComponent ngOnInit input this.user " + JSON.stringify(this.user));
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`dt.component::UrlNewComponent - ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  validForm(){
    if(this.httpUrlValue.valid) return true;
  }

  save(){
    if (this.validForm()){

      this.url.url = this.httpUrlValue.value;

      if(this.url.url && this.user.id && this.user.token){

        // insert new url name via service
        this.urlService.insertItem(this.user, this.url)
        .then(data => console.log("save data = " + JSON.stringify(data)))
        .catch(err => console.log("save err = " + JSON.stringify(err)));
      }
    }
  }
  // valid url
  checkIfUrl(fieldControl: FormControl){
      let thisUrl = fieldControl.value;
      //console.log('UrlNewComponent::checkValidUrl ' + thisUrl);

      let isValid = validUrl.isUri(thisUrl);
      //console.log(thisUrl + " isValid = " + isValid);
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
    <!--
    <div *ngIf="user" >user.id = {{user.id}}</div>
    <div *ngIf="!user" >user is empty</div>
    -->
  `,
  providers: []
})
export class UrlRemoveComponent  implements OnChanges{

  @Input() url: Url;
  @Input() user: User;

  constructor(private urlService: UrlService, private builder: FormBuilder){}

  remove(){
    if (this.url && this.user && this.user.token){
      //console.log('UrlNewComponent::remove');
      this.urlService.removeItem(this.user, this.url);
      //.then(data => console.log("save data = " + JSON.stringify(data)))
      //.catch(err => console.log("save err = " + JSON.stringify(err)));
    }
  }

  ngOnInit() {
      //console.log("UrlNewComponent ngOnInit");
      console.log("dt.component UrlRemoveComponent ngOnInit input this.user " + JSON.stringify(this.user));
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`dt.component::UrlRemoveComponent - ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
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
            <div class="panel-heading"><url-new [user]="user"></url-new></div>

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
export class angular2DataTableComponent  implements OnChanges {
    
    @Input() rows: any[];
    @Input() user: User;

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

  constructor(){}
  ngOnInit() {
      //console.log("UrlNewComponent ngOnInit");
      console.log("dt.component angular2DataTableComponent ngOnInit input this.user " + JSON.stringify(this.user));
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);

      console.log(`dt.component::angular2DataTableComponent - ngOnChanges - ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

}
