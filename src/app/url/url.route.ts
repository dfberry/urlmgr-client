import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { FeedTestComponent } from './';
import { UrlMgrComponent } from './url.mgr.component';
import { TagsAllComponent } from './tags/'

const urlRoutes: Routes = [
  { path: 'urls', component: UrlMgrComponent },
  { path: 'urls/tags/public', component: TagsAllComponent}
];

export const UrlRoutes: ModuleWithProviders = RouterModule.forRoot(urlRoutes);