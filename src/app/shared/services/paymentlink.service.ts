import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { URLSearchParams } from '@angular/http'
import { GlobalApp } from 'src/app/shared/helper/global';


@Injectable({
  providedIn: "root",
})
export class PaymentLinkService {
  baseUrl = environment.apiUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
    public app: GlobalApp,
  ) { }

  // PaymentLink
  PaymentLinkInsert(model: any): any {
    return this.http.post(this.baseUrl + "paymentlink/insert", model);
  }
  PaymentLinkUpdate(model: any): any {
    return this.http.put(this.baseUrl + "paymentlink/update", model);
  }
  PaymentLinkGetAll(filter: any): any {
    let params = new URLSearchParams();
    for (let key in filter) {
      params.set(key, filter[key])
    }
    return this.http.get(this.baseUrl + "paymentlink/getall?" + params.toString());
  }
  PaymentLinkGetById(id: any): any {
    return this.http.get(this.baseUrl + "paymentlink/getbyid?id=" + id);
  }
  PaymentLinkDelete(id: any): any {
    return this.http.delete(this.baseUrl + "paymentlink/delete?id=" + id);
  }
 
}
