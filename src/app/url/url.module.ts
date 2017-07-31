import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import 'rxjs/Rx';
import { DataTableModule } from "angular2-datatable";
import 'cheerio';


//import * as URL_MODULE from './index';
import { UrlRoutes } from './url.route';
import { UrlMgrComponent } from './url.mgr.component';
import { UrlDataTableComponent } from './url/url.datatable.component';
import { UrlNewComponent } from './url/url.new.component';
import { UrlRemoveComponent } from './url/url.remove.component';
import { DataFilterPipe } from './data.filter.pipe';
import { TagMainComponent, TagInputComponent,  TagInputItemComponent } from './tags';
import { IUrl, Url } from './url/url.model';
import { UrlEvent } from './url/url.event';
import { UrlService } from './url/url.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    UrlRoutes
  ],
  declarations: [
// components & pipes
    UrlMgrComponent,
    UrlRemoveComponent,
    UrlNewComponent,
    UrlDataTableComponent,
    DataFilterPipe,
    TagInputComponent,
    TagInputItemComponent,
    TagMainComponent
  ],
  providers: [
// services
    Url,
    UrlEvent,
    UrlService,
  ],
  exports: [
// exported components
    UrlMgrComponent
  ]
})
export class UrlModule {

  // singleton regardless of lazy loading
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UrlModule,
      providers: [
// exported services
        Url,
        UrlEvent,
        UrlService 
      ]
    }
  }
}  