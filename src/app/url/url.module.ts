import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import 'rxjs/Rx';
import { DataTableModule } from "angular2-datatable";
import 'cheerio';
import 'jqcloud2';


//import * as URL_MODULE from './index';
import { UrlRoutes } from './url.route';
import { UrlMgrComponent } from './url.mgr.component';
import { UrlDataTableComponent } from './url/url.datatable.component';
import { UrlNewComponent } from './url/url.new.component';
import { UrlRemoveComponent } from './url/url.remove.component';
import { DataFilterPipe } from './data.filter.pipe';
import { IUrl, Url } from './url/url.model';
import { UrlEvent } from './url/url.event';
import { UrlService } from './url/url.service';
import { TagService, TagsAllComponent, TagMainComponent, TagInputComponent,  TagInputItemComponent } from './tags/index';

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
    TagMainComponent,
    TagsAllComponent
  ],
  providers: [
// services
    Url,
    UrlEvent,
    UrlService,
    TagService
  ],
  exports: [
// exported components
    UrlMgrComponent,
    TagsAllComponent
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