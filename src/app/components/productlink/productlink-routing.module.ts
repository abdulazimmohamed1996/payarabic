import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductLinkComponent } from './edit-productlink/edit-productlink.component';
import { ListProductLinkComponent } from './list-productlink/list-productlink.component';

const routes: Routes = [{
  path:"",
  children:[
    { path:'productlink/create',title:"Edit ProductLink",component: EditProductLinkComponent},
    { path:'productlink/details/:id',title:"ProductLink Details",component: EditProductLinkComponent},
    { path:'productlink/list',title:"ProductLink List",component: ListProductLinkComponent},
  ]}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductLinkRoutingModule { }
