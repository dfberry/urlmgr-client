import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { UserRoutes } from './user/user.routes';
import { UrlMgrComponent } from './components/index';



let appRoutes: Routes = [
  { path: '', component: UrlMgrComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
