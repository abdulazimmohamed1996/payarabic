import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { dataAttributes2 } from 'src/app/shared/data/chart/echart';
import * as chartData from '../../../shared/data/chart/chartjs';
import * as chartData1 from '../../../shared/data/chart/apex';




const DATA  = [ {
id:1,
  image :"./assets/images/products/17.png" ,
  name:"Western Top",
  progresscolor:"warning",
 width:40,
 status:"pending",
 badge:"warning-transparent",
 text:"warning",
 date:"31 May 2022"
},
{
    id:2,
    image :"./assets/images/products/15.png" ,
    name:"Smart Phone",
    progresscolor:"primary",
   width:70,
   status:"Shipping",
   badge:"primary-transparent",
   text:"primary",
 date:"10 May 2022"

  },
  {
    id:3,
    image :"./assets/images/products/11.png" ,
    name:"Novel Book",
    progresscolor:"success",
   width:100,
   status:"Delivered",
   badge:"success-transparent",
   text:"success",
 date:"14 Jun 2022"

  },
  {
    id:4,
    image :"./assets/images/products/12.png",
    name:"Camera",
    progresscolor:"info",
   width:45,
   status:"Hold",
   badge:"info-transparent",
   text:"info",
 date:"31 May 2022"

  },
  {
    id:5,
    image :"./assets/images/products/14.png",
    name:"Mens Shirt",
    progresscolor:"danger",
   width:40,
   status:"Cancelled",
   badge:"danger-transparent",
   text:"danger ",
 date:"05 May 2022"

  },
  {
    id:6,
    image :"./assets/images/products/13.png",
    name:"Kids Frock",
    progresscolor:"secondary",
   width:50,
   status:"Shipped",
   badge:"secondary-transparent",
   text:"secondary ",
 date:"30 Jun 2022"

  }
]



@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})



export class EcommerceComponent implements OnInit {
  @ViewChild('Canvas') Canvas: ElementRef | any;
  @ViewChild('myCanvas') myCanvas: ElementRef | any;

  ItemData=DATA;
  user: any;
  constructor() { }

  ngOnInit(): void {

  }


  
  //Bar Chart (Vertical)
  public barChart2Options = chartData.barChart2Options;
  public barChart2Type = chartData.barChart2Type;
  public barChart2Legend = chartData.barChart2Legend;
  public barChart2Data = chartData.barChart2Data;
  public barChart2Height = chartData.barChart2height;


   click = (id:any)=>{
    var data = this.ItemData.filter((x: {id: any; }) =>{
      return x.id != id;
    })
    this.ItemData = data
  }


  public RandomData = chartData1.ApexRandomData;
  public donutData = chartData1.DonutChartData;




}
