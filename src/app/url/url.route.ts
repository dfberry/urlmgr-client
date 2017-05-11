import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedTestComponent, UrlMgrComponent } from './';
const urlRoutes: Routes = [
  { path: 'urls', component: UrlMgrComponent },
  { path: 'feedtest', component: FeedTestComponent}
];

export const UrlRoutes: ModuleWithProviders = RouterModule.forRoot(urlRoutes);