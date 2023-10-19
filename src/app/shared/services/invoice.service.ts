import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { URLSearchParams } from '@angular/http'
import { GlobalApp } from 'src/app/shared/helper/global';


@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  baseUrl = environment.apiUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
    public app: GlobalApp,
  ) { }


  Insert(model: any): any {
    return this.http.post(this.baseUrl + "invoice/insert", model);
  }
  Update(model: any): any {
    return this.http.put(this.baseUrl + "invoice/update", model);
  }

  GetAll(filter: any, grdfilter: any): any {
    // let flter = JSON.stringify(grdfilter);
    console.log(grdfilter);
    let params = new URLSearchParams();
    for (let key in filter) {
      params.set(key, filter[key])
    }
    //console.log(JSON.stringify(grdfilter));
    //console.log(grdfilter);
    return this.http.get(this.baseUrl + "invoice/getall?" + params.toString());
  }
  getbyid(id: any): any {
    return this.http.get(this.baseUrl + "invoice/getbyid?id=" + id);
  }
}
