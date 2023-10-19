import { Component,  OnInit, } from '@angular/core';

import * as chartData from '../../../shared/data/chart/chartwidgets';
import * as chartData1 from '../../../shared/data/chart/echart';
@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})
export class CrmComponent implements OnInit {

  constructor() {

   }

  ngOnInit(): void {
  }
  public lineChartOptions = chartData.lineChartOptions
  public lineChartType = chartData.lineChartType
  public lineChartLegend = chartData.lineChartLegend
  public lineChartData = chartData.lineChartData
  public echartLineOption2 = chartData1.echartLineOption2;

}
