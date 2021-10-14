import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginV3Component } from './login-v3/login-v3.component';
import { RegisterV3Component } from './register-v3/register-v3.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginV3Component 
    },
    {
        path: 'register',
        component: RegisterV3Component 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
