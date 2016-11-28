// ng
import { NgModule, APP_INITIALIZER }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// ng 3rd party
import 'rxjs/Rx';
import { Store, StoreModule } from '@ngrx/store';
import '@ngrx/core';
import { DataTableModule } from "angular2-datatable";


// this app
import { AppComponent,  
  UrlNewComponent, 
  UrlRemoveComponent, 
  UrlMgrComponent,
  angular2DataTableComponent
} from './components/index';

import {
  FirstFeedPipe
} from './pipes/index';

import { DataFilterPipe,FeedParserPipe }   from './components/dataTables/angular2-datatable/data-filter.pipe';

import { urlReducer, UrlService} from './reducers/index';
import { HttpDataService, ConfigService } from './services/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    DataTableModule,
    StoreModule.provideStore({urls: urlReducer})
    ],
  declarations: [ 
        AppComponent,  
        UrlNewComponent, 
        UrlRemoveComponent,
        UrlMgrComponent,
        FirstFeedPipe,
        DataFilterPipe,
        FeedParserPipe,
        angular2DataTableComponent
     ],
  providers: [
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
