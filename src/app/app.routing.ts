import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { UserRoutes } from './user/user.routes';
import { UrlMgrComponent, DashboardComponent } from './components/index';



let appRoutes: Routes = [
  { path: '', component: DashboardComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
