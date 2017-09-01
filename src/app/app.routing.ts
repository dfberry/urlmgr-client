import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DashboardComponent } from './components/index';
import { AuthGuard } from './app.routing.authguard';
import { HomeComponent, TagListComponent } from './components/';


let appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'public/tag-list', component: TagListComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent},

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
