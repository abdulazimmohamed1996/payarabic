import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositListComponent } from './deposit-list/deposit-list.component';
import { DepositManageComponent } from './deposit-manage/deposit-manage.component';
const routes: Routes = [{
  path:"",
  children:[
    { path:'deposit/list',title:"Deposits",component: DepositListComponent},
    { path:'deposit/manage',title:"Deposit Add",component: DepositManageComponent},
    { path:'deposit/manage/:id',title:"Deposit Update",component: DepositManageComponent},

  ]}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositsRoutingModule { }
