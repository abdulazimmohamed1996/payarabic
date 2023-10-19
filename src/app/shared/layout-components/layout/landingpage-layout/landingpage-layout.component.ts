import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalApp } from 'src/app/shared/helper/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage-layout',
  templateUrl: './landingpage-layout.component.html'
})
export class LandingpageLayoutComponent implements OnInit {
  constructor( ) { }
  ngOnInit(): void {
   
  }
  ngOnDestroy(){
    location.reload()
  }
  
}
