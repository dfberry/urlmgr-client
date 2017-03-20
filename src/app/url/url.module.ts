import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import 'rxjs/Rx';
import { DataTableModule } from "angular2-datatable";
// models
import { IUrl, Url } from './url.model';

// pipes
import { DataFilterPipe } from './data.filter.pipe';
import { FeedParserPipe } from './feed.parser.pipe';

// component
import { UrlMgrComponent } from './url.mgr.component';
import { UrlRemoveComponent } from './url.remove.component';
import { UrlNewComponent } from './url.new.component';
import { UrlDataTableComponent } from './url.datatable.component';

// services
import { UrlService } from './url.service';
import { UrlEvent } from './url.event';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule
  ],
  declarations: [
// components & pipes
    UrlMgrComponent,
    UrlRemoveComponent,
    UrlNewComponent,
    UrlDataTableComponent,
    DataFilterPipe,
    FeedParserPipe

  ],
  providers: [
// services
    Url,
    UrlEvent,
    UrlService
    
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