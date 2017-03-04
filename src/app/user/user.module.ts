import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import 'rxjs/Rx';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { UserRoutes } from './user.routes';

@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  exports: [LoginComponent, RegisterComponent]
})
export class UserModule {}