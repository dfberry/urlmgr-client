import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { FeedTestComponent } from './';
import { UrlMgrComponent } from './url.mgr.component';

const urlRoutes: Routes = [
  { path: 'urls', component: UrlMgrComponent }
];

export const UrlRoutes: ModuleWithProviders = RouterModule.forRoot(urlRoutes);