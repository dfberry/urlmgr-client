import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import 'rxjs/Rx';
import { DataTableModule } from "angular2-datatable";
import 'cheerio';

// routes
import { UrlRoutes } from './url.route';

// models
import { IUrl, Url } from './url/url.model';
import { Feed, FeedDefinition, FeedResponse, Article, FeedInfo} from './feed/feed.model';

// pipes
import { DataFilterPipe } from './data.filter.pipe';
import { FeedParserPipe } from './feed/feed.parser.pipe';

// component
import { UrlMgrComponent } from './url.mgr.component';
import { UrlRemoveComponent } from './url/url.remove.component';
import { UrlNewComponent } from './url/url.new.component';
import { UrlDataTableComponent } from './url/url.datatable.component';

import { FeedListComponent } from './feed/feed.list.component';
import { FeedResponseComponent } from './feed/feed.response.component';
import { FeedMgrComponent } from './feed/feed.mgr.component';
import { FeedTestComponent } from './feed/feed.test.component';

// services
import { UrlService } from './url.service';
import { UrlEvent } from './url/url.event';
import { FeedService } from './feed/feed.service';
import { FeedResponseService } from './feed/feed.response.service';

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
    FeedParserPipe,
    FeedResponseComponent,
    FeedTestComponent
  ],
  providers: [
// services
    Url,
    UrlEvent,
    UrlService,
    FeedService,
    FeedResponseService
  ],
  exports: [
// exported components
    UrlMgrComponent,
    FeedTestComponent
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
        UrlService,
        FeedService,
        FeedResponseService 
      ]
    }
  }
}  