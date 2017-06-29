import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, RegisterComponent, UserComponent, ProfileComponent, UserAuthGuard } from './';

/*
I don't need the data value right now but keeping it as example of how to use it
*/
const userRoutes: Routes = [
  { path: 'register', component: UserComponent, data: [{show: 'register'}] },
  { path: 'login', component: UserComponent },
  { path: 'profile', component: UserComponent, canActivate: [UserAuthGuard] },
  { path: 'logout', component: UserComponent, canActivate: [UserAuthGuard] }

];

export const UserRoutes: ModuleWithProviders = RouterModule.forRoot(userRoutes);