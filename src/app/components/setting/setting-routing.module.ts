import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCurrencyComponent } from './edit-currency/edit-currency.component';
import { ListCurrencyComponent } from './list-currency/list-currency.component';
const routes: Routes = [{
  path:"",
  children:[
    { path:'currency/create',title:"Edit Currency",component: EditCurrencyComponent},
    { path:'currency/details/:id',title:"Currency Details",component: EditCurrencyComponent},
    { path:'currency/list',title:"Currency List",component: ListCurrencyComponent},
  ]}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
