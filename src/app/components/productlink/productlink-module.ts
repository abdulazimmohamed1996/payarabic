import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLinkRoutingModule } from './productlink-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EditProductLinkComponent } from './edit-productlink/edit-productlink.component';
import { ListProductLinkComponent } from './list-productlink/list-productlink.component';

@NgModule({
  declarations: [
    EditProductLinkComponent,
    ListProductLinkComponent,
  ],
  imports: [
    CommonModule,
    ProductLinkRoutingModule,
    SharedModule,
  ]
})
export class ProductLinkModule { }
