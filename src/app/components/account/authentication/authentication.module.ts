import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { EmailActivateComponent } from './email-activate/email-activate.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterComponent,
    EmailActivateComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    NgbModule,
    SharedModule,
     FormsModule,
     ReactiveFormsModule,
    
     AngularFireAuthModule,

  ]
 
})
export class AuthenticationModule { 
  
}
