import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';
import 'rxjs/Rx';
import { UserAuthGuard } from './';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ProfileComponent } from './profile/index';
import { UserRoutes } from './user.routes';
import { ClientAuthenticationService,UserEvent  } from './services/index';
import { User, BroadcastLogoffData, BroadcastLogonData, BroadcastRegistrationData } from './user.model';
import { Token } from './token.model';
import { Configuration } from './config/index';

@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UserComponent
  ],
  providers: [
    ClientAuthenticationService,
    User,
    BroadcastRegistrationData,
    BroadcastLogonData,
    BroadcastLogoffData,
    Token,
    UserEvent,
    Configuration,
    UserAuthGuard
  ],
  exports: [
    LoginComponent,
    ProfileComponent,
    RegisterComponent, 
    UserComponent
  ]
})
export class UserModule {

  // singleton regardless of lazy loading
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [
        ClientAuthenticationService,
        User,
        Token,
        UserEvent,
        BroadcastRegistrationData,
        BroadcastLogonData,
        BroadcastLogoffData
      ]
    }
  }
}  
