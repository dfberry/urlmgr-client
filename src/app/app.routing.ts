import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DashboardComponent } from './components/index';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './app.routing.authguard';

let appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  //{ path: '', component: HomeComponent}
  //{ path: '', component: DashboardComponent, canActivate: [AuthGuard] },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
