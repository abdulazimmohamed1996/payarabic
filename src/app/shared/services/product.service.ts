import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { URLSearchParams } from '@angular/http'
import { GlobalApp } from 'src/app/shared/helper/global';


@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = environment.apiUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
    public app: GlobalApp,
  ) { }

  // Product
  ProductLinkInsert(model: any): any {
    return this.http.post(this.baseUrl + "productlink/insert", model);
  }
  ProductLinkUpdate(model: any): any {
    return this.http.put(this.baseUrl + "productlink/update", model);
  }
  ProductLinkGetAll(filter: any): any {
    let params = new URLSearchParams();
    for (let key in filter) {
      params.set(key, filter[key])
    }
    return this.http.get(this.baseUrl + "productlink/getall?" + params.toString());
  }
  ProductLinkGetById(id: any): any {
    return this.http.get(this.baseUrl + "productlink/getbyid?id=" + id);
  }
  ProductLinkDelete(id: any): any {
    return this.http.delete(this.baseUrl + "productlink/delete?id=" + id);
  }
  ProductLinkGetByKey(id: any): any {
    return this.http.get(this.baseUrl + "ProductLink/getbykey?key=" + id);
  }
  SelectProductLink(isAdd: any): any {
    return this.http.get(this.baseUrl + "ProductLink/getcategory?isAdd=" + isAdd);
  }
  // Product
  ProductInsert(model: any): any {
    return this.http.post(this.baseUrl + "product/insert", model);
  }
  ProductUpdate(model: any): any {
    return this.http.put(this.baseUrl + "product/update", model);
  }
  ProductGetAll(filter: any): any {
    let params = new URLSearchParams();
    for (let key in filter) {
      params.set(key, filter[key])
    }
    return this.http.get(this.baseUrl + "product/getall?" + params.toString());
  }
  ProductGetById(id: any): any {
    return this.http.get(this.baseUrl + "product/getbyid?id=" + id);
  }
  ProductDelete(id: any): any {
    return this.http.delete(this.baseUrl + "product/delete?id=" + id);
  }
  // Product Category
  CategoryInsert(model: any): any {
    return this.http.post(this.baseUrl + "productcategory/insert", model);
  }
  CategoryUpdate(model: any): any {
    return this.http.put(this.baseUrl + "productcategory/update", model);
  }
  CategoryGetAll(filter: any): any {
    let params = new URLSearchParams();
    for (let key in filter) {
      params.set(key, filter[key])
    }
    return this.http.get(this.baseUrl + "productcategory/getall?" + params.toString());
  }
  CategoryGetById(id: any): any {
    return this.http.get(this.baseUrl + "productcategory/getbyid?id=" + id);
  }
  CategoryDelete(id: any): any {
    return this.http.delete(this.baseUrl + "productcategory/delete?id=" + id);
  }
}
