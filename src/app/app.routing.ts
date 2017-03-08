import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/index';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './user/auth.guard.service';


let appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
