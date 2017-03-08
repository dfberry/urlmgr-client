import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import 'rxjs/Rx';

import { AuthenticationComponent } from './auth.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ProfileComponent } from './profile.component';
import { UserRoutes } from './user.routes';
import { AuthenticationService } from './auth.service';
import { AuthGuard } from './auth.guard.service';


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
  providers: [
    AuthGuard,
    AuthenticationService
    
  ],
  exports: [
    LoginComponent, 
    RegisterComponent, 
    ProfileComponent, 
    AuthenticationComponent
  ]
})
export class UserModule {

  // singleton regardless of lazy loading
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [
        AuthGuard,
        AuthenticationService
      ]
    }
  }
}  
