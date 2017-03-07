import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import 'rxjs/Rx';

import { AuthenticationComponent } from './auth.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ProfileComponent } from './profile.component';
import { UserRoutes } from './user.routes';


@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AuthenticationComponent
  ],
  exports: [LoginComponent, RegisterComponent, ProfileComponent, AuthenticationComponent]
})
export class UserModule {}