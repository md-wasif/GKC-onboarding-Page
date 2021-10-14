import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { LogoModule } from '@app/shared/components/logo/logo.module';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

import { LoginV3Component } from './login-v3/login-v3.component';
import { RegisterV3Component } from './register-v3/register-v3.component';

@NgModule({
    declarations: [ 
        RegisterFormComponent,
        LoginFormComponent,
        LoginV3Component,
        RegisterV3Component
    ],
    imports: [
        AuthRoutingModule,
        SharedModule,
        LogoModule,
        LogoModule,
        NgBootstrapFormValidationModule.forRoot(),
    ]
})
export class AuthModule { }
