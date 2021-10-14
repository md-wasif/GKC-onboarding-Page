import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DashboardRoutingModule } from './dashboard-routing.module'

import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BrandManagementComponent } from './brand-management/brand-management.component';

@NgModule({
    imports: [
        CommonModule,
        NgxDatatableModule,
        DashboardRoutingModule,
    ],
    exports: [],
    declarations: [
        HomeComponent,
        UserManagementComponent,
        BrandManagementComponent
    ],
})
export class DashboardModule { }
