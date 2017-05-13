import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthenticationComponent } from './auth.component';
import { ProfileComponent } from './profile';

const userRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
];

export const UserRoutes: ModuleWithProviders = RouterModule.forRoot(userRoutes);