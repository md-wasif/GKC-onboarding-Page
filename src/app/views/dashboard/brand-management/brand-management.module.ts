import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrandManagementComponent } from './brand-management.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    declarations: [
        BrandManagementComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        ModalModule,
        NgSelectModule,
        SharedModule
    ]
})
export class BrandManagementModule { }
