import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { URLSearchParams } from '@angular/http'
import { GlobalApp } from 'src/app/shared/helper/global';


@Injectable({
  providedIn: "root",
})
export class SettingService {
  baseUrl = environment.apiUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
    public app: GlobalApp,
  ) { }

  // Currency
  CurrencyInsert(model: any): any {
    return this.http.post(this.baseUrl + "currency/insert", model);
  }
  CurrencyUpdate(model: any): any {
    return this.http.put(this.baseUrl + "currency/update", model);
  }
  CurrencyGetAll(filter: any): any {
    let params = new URLSearchParams();
    for (let key in filter) {
      params.set(key, filter[key])
    }
    return this.http.get(this.baseUrl + "currency/getall?" + params.toString());
  }
  CurrencyGetById(id: any): any {
    return this.http.get(this.baseUrl + "currency/getbyid?id=" + id);
  }
  CurrencyDelete(id: any): any {
    return this.http.delete(this.baseUrl + "currency/delete?id=" + id);
  }
}
