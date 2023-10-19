import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPaymentLinkComponent } from './edit-paymentlink/edit-paymentlink.component';
import { ListPaymentLinkComponent } from './list-paymentlink/list-paymentlink.component';
const routes: Routes = [{
  path:"",
  children:[
    { path:'paymentlink/create',title:"Edit PaymentLink",component: EditPaymentLinkComponent},
    { path:'paymentlink/details/:id',title:"PaymentLink PaymentLink",component: EditPaymentLinkComponent},
    { path:'paymentlink/list',title:"PaymentLink List",component: ListPaymentLinkComponent},
  ]}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentLinkRoutingModule { }
