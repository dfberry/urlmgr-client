import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlMgrComponent } from './url.mgr.component';
import { FeedTestComponent } from './feed.test.component';
const urlRoutes: Routes = [
  { path: 'urls', component: UrlMgrComponent },
  { path: 'feedtest', component: FeedTestComponent}
];

export const UrlRoutes: ModuleWithProviders = RouterModule.forRoot(urlRoutes);