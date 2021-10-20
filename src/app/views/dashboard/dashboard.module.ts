import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DashboardRoutingModule } from './dashboard-routing.module'

import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BrandManagementComponent } from './brand-management/brand-management.component';
import { SwitchModule } from '@app/shared/components/switch/switch.module';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        NgxDatatableModule,
        DashboardRoutingModule,
        ModalModule.forRoot(),
        SwitchModule,
        NgSelectModule,
        NgBootstrapFormValidationModule.forRoot(),
        PerfectScrollbarModule
    ],
    exports: [],
    declarations: [
        HomeComponent,
        UserManagementComponent,
        BrandManagementComponent,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
       
    ]
})
export class DashboardModule { }
