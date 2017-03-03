import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { UserRoutes } from './user.routes';

@NgModule({
  imports: [
    CommonModule,
    UserRoutes
  ],
  declarations: [
    LoginComponent
  ],
  exports: [LoginComponent]
})
export class UserModule {}