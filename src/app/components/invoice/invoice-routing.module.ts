import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceManageComponent } from './invoice-manage/invoice-manage.component';
import { InvoiceBatchComponent } from './invoice-batch/invoice-batch.component';
const routes: Routes = [{
  path:"",
  children:[
    { path:'invoice/list',title:"Invoice List",component: InvoiceListComponent},
    { path:'invoice/manage',title:"Invoice manage",component: InvoiceManageComponent},
    { path:'invoice/manage/:id',title:"Invoice manage",component: InvoiceManageComponent},
    { path:'invoice/quick',title:"Quick Invoice",component: InvoiceManageComponent},
    { path:'invoice/batch',title:"Batch Invoices",component: InvoiceBatchComponent}
  ]}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
