import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
const routes: Routes = [{
  path:"",
  children:[
    { path:'product/create',title:"Edit Product",component: EditProductComponent},
    { path:'product/details/:id',title:"Product Details",component: EditProductComponent},
    { path:'product/list',title:"Product List",component: ListProductComponent},
    { path:'category/create',title:"Edit Category",component: EditCategoryComponent},
    { path:'category/details/:id',title:"Category Details",component: EditCategoryComponent},
    { path:'category/list',title:"Category List",component: ListCategoryComponent},
  ]}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
