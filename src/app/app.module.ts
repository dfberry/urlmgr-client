// ng
import { NgModule, APP_INITIALIZER, ValueProvider }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
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
  NavigationComponent,
  DashboardComponent
} from './components/index';

import { 
  HttpDataService, 
  Broadcaster 
} from './services/index';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AppStore, AppState, UserState, UserActions, UrlState, UrlActions } from './app.state';
import { AuthGuard} from './app.routing.authguard';
import { UserModule} from './user/user.module';
import { UrlModule } from './url/url.module';
import { AlertModule } from './alert/alert.module';
import { HomeModule } from './home/home.module';
import { ConfigService } from './config/config.service';
import { StateService } from './state/index';

let userModule = UserModule.forRoot();
let urlModule = UrlModule.forRoot();

@NgModule({
  imports: [
    // my code
    AppRoutes,
    userModule,
    urlModule,
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

    StoreModule.provideStore({urls: UrlState, /*feeds: feedReducer, selectedFeed: selectedFeedReducer, */user: UserState}),
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
        NavigationComponent,
        DashboardComponent
     ],
  providers: [
    HttpDataService, 
    ConfigService, 
    Broadcaster,
    AuthGuard,
    Title,
    AppState,
    AppStore,
    StateService,
    { provide: APP_INITIALIZER, useFactory: (config: ConfigService) => () => config.load(), deps: [ConfigService], multi: true }
  ],
  bootstrap: [ AppComponent]
})
export class AppModule { 
  constructor(){//console.log("AppModule");
  }
}
