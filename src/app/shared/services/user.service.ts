import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { URLSearchParams } from '@angular/http'
import { GlobalApp } from 'src/app/shared/helper/global';


@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
    public app: GlobalApp,
  ) { }

  //Start Users APIs
  UserGetAll(filter: any): any {
    let params = new URLSearchParams();
    for (let key in filter) {
      params.set(key, filter[key])
    }
    return this.http.get(this.baseUrl + "User/getalluser?" + params.toString());
  }
  GetPermissionList(id: any) {
    return this.http.get(this.baseUrl + "User/GetUserPermission?userId=" + id);
  }
  PaymentMethodsGetAll(id: any) {
    return this.http.get(this.baseUrl + "User/GetPaymentMethod?userId=" + id);
  }
  SelectUserRecord(id: any) {
    return this.http.get(this.baseUrl + "User/getbyid?id=" + id);
  }
  
  Register(model: any): any {
    return this.http.post(this.baseUrl + "User/register", model);
  }
  SaveUserPermission(model: any): any {
    return this.http.post(this.baseUrl + "User/SaveUserPermission", model);
  }
  UserAdd(model: any): any {
    return this.http.post(this.baseUrl + "User/insert", model);
  }
  UserUpdate(model: any): any {
console.log(model)
    return this.http.put(this.baseUrl + "User/update", model);
  }
  DeleteUser(id: any): any {
    return this.http.delete(this.baseUrl + "User/delete?id=" + id);
  }

  UserActivate(id: any, status: any): any {
    console.log('URL', "User/activate?id=" + id + "&activate=" + status)
    return this.http.put(this.baseUrl + "User/activate?id=" + id + "&activate=" + status, "");
  }
}
