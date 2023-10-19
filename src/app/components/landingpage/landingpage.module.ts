import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingPageRoutingModule } from './landingpage-routing.module';
//import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
  //  NgImageSliderModule,
  CarouselModule ,
    LandingPageRoutingModule,
    SharedModule
  ],
  providers: [
    
  ]
})
export class LandingPageModule { 
  
}
