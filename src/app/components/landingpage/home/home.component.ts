import { Component, OnInit,Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router , NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event as NavigationEvent} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  

  ngOnInit(): void {

    // setTimeout(() => {
    //   this.showslider = true;
    // }, 500);
    
  }

  customOptions: OwlOptions = {
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 2,
    navText: ["<b> < </b>","<b> > </b>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      }
     
    },
    nav: true
  }
  customOption: OwlOptions = {
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 2,
    navText: ["<b> < </b>","<b> > </b>"],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      }
     
    },
    nav: true
  }

  
}
