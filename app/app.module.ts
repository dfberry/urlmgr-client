// ng
import { NgModule, APP_INITIALIZER, ValueProvider }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// ng 3rd party
import 'rxjs/Rx';

import '@ngrx/core';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { DataTableModule } from "angular2-datatable";



// this app
import { AppComponent,  
  UrlNewComponent, 
  UrlRemoveComponent, 
  UrlMgrComponent,
  angular2DataTableComponent,
  ExComponent,
  FeedResponseComponent,
  FeedListComponent,
  FeedMgrComponent,
  UrlFeedDetailLinkComponent,
  NavigationComponent,
  DashboardComponent
} from './components/index';

import {
  FirstFeedPipe
} from './pipes/index';

import { DataFilterPipe,FeedParserPipe }   from './components/dataTables/angular2-datatable/data-filter.pipe';

import { AppState, urlReducer, UrlService, FeedResponseService, feedReducer, selectedFeedReducer, FeedDefinition, FeedResponse, Feed, Article} from './reducers/index';
import { HttpDataService, ConfigService } from './services/index';

const appRoutes: Routes = [
  { path: 'feed/:id/:url', component: FeedResponseComponent },
  { path: 'feed', component: FeedMgrComponent},
  { path: 'url', component: UrlMgrComponent },
  { path: '', component: DashboardComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    CommonModule,
    RouterModule,
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    DataTableModule,
    StoreModule.provideStore({urls: urlReducer, feeds: feedReducer, selectedFeed: selectedFeedReducer}),
    StoreDevtoolsModule.instrumentStore({
          monitor: useLogMonitor({
            visible: true,
            position: 'right'
          })
        }),
        StoreLogMonitorModule
    ],
  declarations: [ 
        AppComponent,  
        UrlNewComponent, 
        UrlRemoveComponent,
        UrlMgrComponent,
        FirstFeedPipe,
        DataFilterPipe,
        FeedParserPipe,
        angular2DataTableComponent,
        ExComponent,
        FeedResponseComponent,
        FeedListComponent,
        FeedMgrComponent,
        UrlFeedDetailLinkComponent,
        NavigationComponent,
        DashboardComponent
     ],
  providers: [
    FeedResponseService,
    UrlService, 
    HttpDataService, 
    ConfigService, 
    { provide: APP_INITIALIZER, useFactory: (config: ConfigService) => () => config.load(), deps: [ConfigService], multi: true }
  ],
  bootstrap: [ AppComponent]
})
export class AppModule { 
  constructor(){//console.log("AppModule");
  }
}
