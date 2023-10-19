import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { URLSearchParams } from '@angular/http'
import { GlobalApp } from 'src/app/shared/helper/global';


@Injectable({
  providedIn: "root",
})
export class DepositService {
  baseUrl = environment.apiUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
    public app: GlobalApp,
  ) { }
  
 
  Insert(model: any): any {
    return this.http.post(this.baseUrl + "deposit/insert", model);
  }
  Update(model: any): any {
    return this.http.put(this.baseUrl + "deposit/update", model);
  }
  getinvoicebyid(id: any): any {
    return this.http.get(this.baseUrl + "invoice/getbyid?id=" + id);
  }
  GetAll(filter: any): any {
    let params = new URLSearchParams();
    for (let key in filter) {
      params.set(key, filter[key])
    }
    return this.http.get(this.baseUrl + "deposit/getall?" + params.toString());
  }
  GetVendorInvoicesReadyForDeposit(filter: any): any {
    let params = new URLSearchParams();
    for (let key in filter) {
      params.set(key, filter[key])
    }
    console.log(params.toString());
    return this.http.get(this.baseUrl + "deposit/GetVendorInvoicesReadyForDeposit?" + params.toString());
  }
  getbyid(id: any): any {
    return this.http.get(this.baseUrl + "deposit/getbyid?id=" + id);
  }
}
