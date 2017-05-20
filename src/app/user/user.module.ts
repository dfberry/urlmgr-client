import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import 'rxjs/Rx';

import { AuthenticationComponent } from './auth.component';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutes } from './user.routes';
import { ServerAuthenticationService, AuthenticationService,UserEvent  } from './services/index';
import { User } from './user.model';
import { Configuration } from './config/index';

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
    AuthenticationService,
    User,
    UserEvent,
    Configuration,
    ServerAuthenticationService
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
        AuthenticationService,
        User,
        UserEvent,
        ServerAuthenticationService
      ]
    }
  }
}  
