import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EditCurrencyComponent } from './edit-currency/edit-currency.component';
import { ListCurrencyComponent } from './list-currency/list-currency.component';

@NgModule({
  declarations: [
    EditCurrencyComponent,
    ListCurrencyComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
  ]
})
export class SettingModule { }
