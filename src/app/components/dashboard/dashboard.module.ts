import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SalesComponent } from './sales/sales.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { CryptoComponent } from './crypto/crypto.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CrmComponent } from './crm/crm.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxEchartsModule } from 'ngx-echarts';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { TableComponent } from './sales/table/table.component';
import { SearchtableComponent } from './crypto/searchtable/searchtable.component';


@NgModule({
  declarations: [
      SalesComponent,
      EcommerceComponent,
      CryptoComponent,
        AnalyticsComponent,
        CrmComponent,
        TableComponent,
        SearchtableComponent,


    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        NgChartsModule,
        NgbModule,
        NgApexchartsModule,
        NgCircleProgressModule.forRoot(),
        NgSelectModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),


        FormsModule,
        ReactiveFormsModule,



],
providers: [],
bootstrap: [AppComponent]
})
export class DashboardModule { }
