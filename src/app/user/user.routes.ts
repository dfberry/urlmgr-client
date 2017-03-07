import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { AuthenticationComponent } from './auth.component';
import { ProfileComponent } from './profile.component';

const userRoutes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
];

export const UserRoutes: ModuleWithProviders = RouterModule.forRoot(userRoutes);