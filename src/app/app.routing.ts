import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrlMgrComponent, DashboardComponent } from './components/index';



const appRoutes: Routes = [
  //{ path: 'feed/:id/:url', component: FeedResponseComponent },
  //{ path: 'feed', component: FeedMgrComponent},
  { path: 'url', component: UrlMgrComponent },
  { path: '', component: DashboardComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
