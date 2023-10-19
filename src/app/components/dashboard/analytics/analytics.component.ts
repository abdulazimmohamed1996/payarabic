import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

import * as chartData from '../../../shared/data/chart/echart';
import { ChartOptions } from '../sales/sales.component';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>|any

  constructor() {
    this.chartOptions = {
      series: [48, 18, 34],
      height:380,
      top:'0',
      chart: {
        width: 350,
        type: "donut",
        height:550
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            // chart: {
            //   width: 50
            // },
            // legend: {
            //   position: "bottom",
            //   show:false
            // }
          }
        }
      ]
    };
   }

  ngOnInit(): void {

  }
  public echartLineOption1 = chartData.echartLineOption1;


}
