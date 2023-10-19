import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositsRoutingModule } from './deposits-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DepositListComponent } from './deposit-list/deposit-list.component';
import { DepositManageComponent } from './deposit-manage/deposit-manage.component';

@NgModule({
  declarations: [
    DepositListComponent,
    DepositManageComponent
  ],
  imports: [
    CommonModule,
    DepositsRoutingModule,
    SharedModule,
  ]
})
export class DepositsModule { }
