import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CrmComponent } from './crm/crm.component';
import { CryptoComponent } from './crypto/crypto.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  {
    path:"",
    children:[
      {path:"dashboard/analytics",title:"Slica-Analytics", component:AnalyticsComponent},
      {path:"dashboard/crm",title:"Slica-CRM",component: CrmComponent },
      {path:"dashboard/crypto",title:"Slica-Crypto",component: CryptoComponent},
      {path:"dashboard/ecommerce",title:"Slica-Ecommerce",component: EcommerceComponent},
      {path:"dashboard/sales",title:"Slica-Sales",component: SalesComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class DashboardRoutingModule { }
