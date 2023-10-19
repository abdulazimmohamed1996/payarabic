import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentLinkRoutingModule } from './paymentlink-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EditPaymentLinkComponent } from './edit-paymentlink/edit-paymentlink.component';
import { ListPaymentLinkComponent } from './list-paymentlink/list-paymentlink.component';

@NgModule({
  declarations: [
    EditPaymentLinkComponent,
    ListPaymentLinkComponent,
  ],
  imports: [
    CommonModule,
    PaymentLinkRoutingModule,
    SharedModule,
  ]
})
export class PaymentLinkModule { }
