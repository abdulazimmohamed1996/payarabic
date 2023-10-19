
import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import { table } from './tableType';
import {TableService} from './table.service';
import {TableDirective, SortEvent} from './table.directive';

import * as chartData from '../../../../shared/data/chart/apex';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexFill,
  ApexStroke,
  ApexDataLabels,
  ApexGrid,

} from "ng-apexcharts";

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-searchtable',
  templateUrl: './searchtable.component.html',
  styleUrls: ['./searchtable.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class SearchtableComponent {
  countries$: Observable<table[]>;
  total$: Observable<number>;

  @ViewChildren(TableDirective) headers!: QueryList<TableDirective>;

  @ViewChild("chart")chart!: ChartComponent;
  public chartOptions2: Partial<ChartOptions2>|any

  constructor(public service: TableService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;

    this.chartOptions2 = {
      series: [
        {

          data: [30, 141, 25, 130, 19, 82, 15, 91, 50],

        },


      ],

      chart: {
        height: 80,
        top:200,
        width: 150,
        type: "line",
        zoom: {
          enabled: false
        },

      },

dataLabels:{
  enabled:false,

},
      tooltip:{
        enabled:false
      },
      grid: {
        show: false,      // you can either change hear to disable all grids


        yaxis: {
          lines: {
            show: false, //or just here to disable only y axis
 },
          show:false
         },
      },

      xaxis: {
        labels: {
          show: false
        },

      },
      yaxis: {
        labels: {
          show: false
        },

      }

    };

  }

  ngOnInit(): void {
  }

  onSort(element:any) {
    console.log(typeof element);

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== element.column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = element.column;
    this.service.sortDirection = element.direction;
  }


}
