import { Injectable } from '@angular/core'; // imports the class that provides local storage for token
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalApp } from 'src/app/shared/helper/global';



@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor( public app: GlobalApp ){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.showLoader();
    const token = localStorage.getItem('token'); // This retrieves a token from local storage
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });// This clones HttpRequest and Authorization header with Bearer token added
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    req = req.clone({ headers: req.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate') });
    req = req.clone({ headers: req.headers.set('Pragma', 'no-cache') });
    req = req.clone({ headers: req.headers.set('Expires', '0') });
    req = req.clone({ headers: req.headers.set('Server', '') });
    
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => { 
      if (event instanceof HttpResponse) {
        this.onEnd();
      }
    },
      (error: any) => {
        if (error && error.status === 401) {
          // var lng:any = localStorage.getItem("lang");
          // localStorage.clear();
          // localStorage.setItem('lang', lng);
          // window.location.href = '/auth/login';
        }
        const err = error.error.message || error.statusText;
        this.onEnd();
        return throwError(error); // any further errors are returned to frontend
    }));
/*
    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {
                // Catching Error Stage
                if (error && error.status === 401) {
                  localStorage.clear();
                  window.location.href = '/account/login'
                }
                const err = error.error.message || error.statusText;
                return throwError(error); // any further errors are returned to frontend
           })
        );

        */
  }
  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(): void {
   this.app.isAjaxLoading = true;
  }
  private hideLoader(): void {
    this.app.isAjaxLoading = false;
  }
}
