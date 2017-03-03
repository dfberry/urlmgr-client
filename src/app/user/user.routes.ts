import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const userRoutes: Routes = [
  //{ path: '', component: LoginComponent }
];

export const UserRoutes: ModuleWithProviders = RouterModule.forChild(userRoutes);