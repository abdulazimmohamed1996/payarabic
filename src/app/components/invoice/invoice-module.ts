import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { SharedModule } from '../../shared/shared.module';
import { InvoiceManageComponent } from './invoice-manage/invoice-manage.component';
import { InvoiceBatchComponent } from './invoice-batch/invoice-batch.component';



@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceManageComponent,
    InvoiceBatchComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule
  ]
})
export class FormModule { }
