import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GlobalApp } from 'src/app/shared/helper/global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  authState: any;

  constructor(
    private afu: AngularFireAuth, 
    private router: Router,
    public http: HttpClient,
    public app: GlobalApp,
    ) {
    this.afu.authState.subscribe((auth =>{
      this.authState = auth;
    }))
  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  Register(model: any): any {

    return this.http.post(this.baseUrl + "User/register", model);
  }
  Login(model: any): any {

    return this.http.post(this.baseUrl + "User/Login", model);
  }
  ActivateEmail(emailActivationKey: any, mobileKey: any): any {

    return this.http.put(this.baseUrl + "User/activateEmail?emailActivationKey=" + encodeURIComponent(emailActivationKey) + "&mobileActivationKey=" + mobileKey, null);
  }
  Signoutapi(): any {
    return this.http.delete(this.baseUrl + "User/logout");
  }


  loginWithEmail(email: string, password: string)
  {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(_error => {
        console.log(_error)
        throw _error
      });
  }

  singout(): void
  {
    this.afu.signOut();
    this.router.navigate(['/login']);
  }
  GetUserPermissions(userId: any): any {
    return this.http.get(this.baseUrl + "User/GetUserPermission?userId=" + userId);
  }

}
