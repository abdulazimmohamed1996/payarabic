import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as chartData from '../../../shared/data/chart/apex';
import * as chartData1 from '../../../shared/data/chart/echart';
import * as chartData2 from '../../../shared/data/chart/chartjs';
import * as Chart from 'chart.js';

import {


  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexGrid,

} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
  grid: ApexGrid;

};

const DATATABL: any = [{
  id: "#01",
  image: "./assets/images/products/1.png",
  name: "Metal Watch",
  progresscolor: "success-transparent",
  width: 40,
  status: "pending",
  text: "success",
  cost: "$14,500",
  paymentmode: "Online Payment",
  clientName: "Sean Black",
  productid: "PRO12345"
},]
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  @ViewChild('Canvas') Canvas: ElementRef | any;
  @ViewChild('myCanvas') myCanvas: ElementRef | any;
  @ViewChild('myCanvas1') myCanvas1: ElementRef | any;
  @ViewChild('myCanvas2') myCanvas2: ElementRef | any;
  @ViewChild('myCanvas3') myCanvas3: ElementRef | any;
  @ViewChild("chart")
  chart!: ChartComponent;
  xaxis=[];
  // ProductData=DATA;
  public isCollapsed1 = false;
  public isClosed1 = false;
  public isCollapsed2 = false;
  public isClosed2 = false;
  chartOptions: any;
  service: any;
  term: any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Orders",
          type: "bar",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
          name: "Profits",
          type: "area",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        },
        {
          name: "Sales",
          type: "line",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }

      ],
      chart: {
        height: 350,
        type: "line",
        left:"-57"
      },

      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [0],
        curve: "smooth"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }

      },


      // xaxis: {
      //   type: "datetime"
      // },
      yaxis: {
        title: {
          text: ""
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y: number) {
            if (typeof y !== "undefined") {
              return y?.toFixed(0) + " points";
            }
            return y;
          }
        }
      },
      grid: {
        show: false
      },



    };




  }

  ngOnInit(): void {
  }
  Collapsetoggle1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  Closetoggle1() {
    this.isClosed1 = true
  }
  Collapsetoggle2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
  Closetoggle2() {
    this.isClosed2 = true
  }


  public generateData(count: number, xrange: { max: number; min: number; }) {
    var i = 0;
    var series : any = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (xrange.max - xrange.min + 1)) + xrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }

  ngAfterViewInit() {


    //Area Chart
    const ctx:any = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');

    const ctx1:any = (<HTMLCanvasElement>this.myCanvas1.nativeElement).getContext('2d');

    const ctx2:any = (<HTMLCanvasElement>this.myCanvas2.nativeElement).getContext('2d');
    const ctx3:any = (<HTMLCanvasElement>this.myCanvas3.nativeElement).getContext('2d');
    // const areaGradient2 = ctx.createLinearGradient(0, 280, 0, 0);
    // areaGradient2.addColorStop(0, 'rgba(0, 123, 255, 0)');
    // areaGradient2.addColorStop(1, 'rgba(0, 123, 255, .3)');
    const area_chart = new Chart.Chart(ctx, {
      type: 'line',

      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [20, 35, 30, 47, 39, 45, 55,66,55,45,65,72],
          borderColor: '#fbcfd6',
          borderWidth: 1,
          backgroundColor: 'rgba(253,234,237,1)',
          tension:0.4,
          pointRadius:0,
          fill: 'origin'
        }, ]
      },
      options: {
        maintainAspectRatio: false,
        plugins:{
          legend: {
            display: false,
          },
        },
        scales: {
          y: {

            grid: {
              display: false,
              color: 'rgba(253, 234, 237,1)',

            },
            display:false
          },
          x: {

            grid: {
              display: false,
              color: 'rgba(253, 234, 237,1)',

            },
            display:false
          }
        }
      }

    })

    const area_chart1 = new Chart.Chart(ctx1, {
      type: 'line',

      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [20, 35, 30, 47, 39, 45, 55,66,55,45,65,72],
          borderColor: '#cbdcf5',
          borderWidth: 1,
          backgroundColor:'rgba(229, 237, 250,1)',
          tension:0.4,
          pointRadius:0,
          fill: 'origin', }, ]
      },
      options: {
        maintainAspectRatio: false,
        plugins:{
          legend: {
            display: false,
          },
        },
        scales: {
          y: {

            grid: {
              display: false,
              color: 'rgba(229, 237, 250,1)',

            },
            display:false
          },
          x: {

            grid: {
              display: false,
              color: 'rgba(229, 237, 250,1)',

            },
            display:false
          }

        }

      }

    })
    function removeRedDot() {
      ctx1.clearRect(97, 97, 6, 6);
      alert('Removed Red Dot');
    }
    const area_chart2 = new Chart.Chart(ctx2, {
      type: 'line',

      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [20, 35, 30, 47, 39, 45, 55,45,55,45,65,72],
          borderColor: '#b8e2ff',
          borderWidth: 1,
          backgroundColor:'rgba(229, 245, 255,1)',
          tension:0.4,
          pointRadius:0,
          fill: 'origin',

        }, ]
      },
      options: {
        maintainAspectRatio: false,
        plugins:{
          legend: {
            display: false,
          },
        },
        scales: {
          y: {

            grid: {
              display: false,
              color: 'rgba(229, 237, 250,1)',

            },
            display:false
          },
          x: {

            grid: {
              display: false,
              color: 'rgba(229, 237, 250,1)',

            },
            display:false
          }
        }
      }
    })
    const area_chart3 = new Chart.Chart(ctx3, {
      type: 'line',

      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [20, 35, 30, 47, 39, 45, 55,66,55,45,65,72],
          borderColor: '#d4edd3',
          borderWidth: 1,
          backgroundColor:'rgba(233, 246, 233,1)',
          tension:0.4,
          pointRadius:0,
          fill: 'origin',


        }, ]
      },
      options: {
        maintainAspectRatio: false,
        plugins:{
          legend: {
            display: false,
          },
        },
        scales: {
          y: {

            grid: {
              display: false,
              color: 'rgba(229, 237, 250,1)',

            },
            display:false
          },
          x: {

            grid: {
              display: false,
              color: 'rgba(229, 237, 250,1)',

            },
            display:false
          }
        }
      }
    })

    ctx.clearRect(97, 97, 6, 6);
  }



  public apexData = chartData.ApexChartData;
  public apexData2 = chartData.ApexChartData2;
  public apexData3 = chartData.ApexChartData3;
  public apexData4 = chartData.ApexChartData4;
  public dataAttributes2 = chartData1.dataAttributes2;
  public barData = chartData.BarData;

  public polarAreaChartLabels = chartData2.polarAreaChartLabels
  public polarAreaChartData = chartData2.polarAreaChartData
  public polarAreaLegend = chartData2.polarAreaLegend
  public polarChartOptions = chartData2.polarChartOptions
  public polarAreaChartType = chartData2.polarAreaChartType
}
