import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '@/app/states/auth/actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router,private store:Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      const cloned = req.clone({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      });
      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error.status === 401) {
            this.store.dispatch(AuthActions.logout())
            this.router.navigate(['/login']);
          }
          return throwError(()=> error);
        })
      );
    }

    return next.handle(req);
  }
}
