import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import 'rxjs/Rx';
import { DataTableModule } from "angular2-datatable";
import 'cheerio';


import * as URL_MODULE from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    URL_MODULE.UrlRoutes
  ],
  declarations: [
// components & pipes
    URL_MODULE.UrlMgrComponent,
    URL_MODULE.UrlRemoveComponent,
    URL_MODULE.UrlNewComponent,
    URL_MODULE.UrlDataTableComponent,
    URL_MODULE.DataFilterPipe,
    URL_MODULE.FeedParserPipe,
    URL_MODULE.FeedResponseComponent,
    URL_MODULE.FeedTestComponent

  ],
  providers: [
// services
    URL_MODULE.Url,
    URL_MODULE.UrlEvent,
    URL_MODULE.UrlService,
    URL_MODULE.FeedService,
    URL_MODULE.FeedResponseService
    
  ],
  exports: [
// exported components
    URL_MODULE.UrlMgrComponent,
    URL_MODULE.FeedTestComponent
  ]
})
export class UrlModule {

  // singleton regardless of lazy loading
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UrlModule,
      providers: [
// exported services
        URL_MODULE.Url,
        URL_MODULE.UrlEvent,
        URL_MODULE.UrlService,
        URL_MODULE.FeedService,
        URL_MODULE.FeedResponseService 
      ]
    }
  }
}  