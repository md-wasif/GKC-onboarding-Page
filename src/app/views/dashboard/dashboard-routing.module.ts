import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandManagementComponent } from './brand-management/brand-management.component';

import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { PromotionsComponent } from './promotions/promotions.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent 
    },
    {
        path: 'usermanagement',
        component: UserManagementComponent 
    },
    {
        path: 'brandmanagement',
        component: BrandManagementComponent 
    },
    {
        path: 'promotions',
        component: PromotionsComponent 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
