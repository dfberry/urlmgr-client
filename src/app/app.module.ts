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
import {   
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

import { urlReducer, UrlService, 
  FeedResponseService, feedReducer, selectedFeedReducer, 
  FeedDefinitionService,
  FeedDefinition, FeedResponse, Feed, Article} from './reducers/index';
import { 
  HttpDataService, 
  ConfigService,
  Broadcaster 
} from './services/index';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AppState, UserState, UserStates } from './app.state';
import { AuthGuard} from './app.routing.authguard';
import { UserModule} from './user/user.module';
import { AlertModule } from './alert/alert.module';
import { HomeModule } from './home/home.module';

let userModule = UserModule.forRoot();

@NgModule({
  imports: [
    // my code
    AppRoutes,
    userModule,
    HomeModule,

    // 3rd party code
    DataTableModule,

    // angular code
    CommonModule,
    RouterModule,
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,

    StoreModule.provideStore({urls: urlReducer, feeds: feedReducer, selectedFeed: selectedFeedReducer, user: UserState}),
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
    FeedDefinitionService,
    UrlService, 
    HttpDataService, 
    ConfigService, 
    Broadcaster,
    AuthGuard,
    { provide: APP_INITIALIZER, useFactory: (config: ConfigService) => () => config.load(), deps: [ConfigService], multi: true }
  ],
  bootstrap: [ AppComponent]
})
export class AppModule { 
  constructor(){//console.log("AppModule");
  }
}
