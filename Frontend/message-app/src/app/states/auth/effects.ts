import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap, of } from "rxjs";
import { AuthActions } from "./actions";
import { AuthApiService } from "@/app/services/api/auth.api.service";
import { Router } from "@angular/router";
import { AuthService } from "@/app/services/auth.service";
import { FriendActions } from "../friends/actions";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authApiService: AuthApiService, private router: Router, private authService: AuthService) { }

  createAccount$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.createAccount),
    mergeMap((action) => this.authApiService.createAccount(action.payload).pipe(
      map(payload => {
        this.router.navigate(['login'])
        return AuthActions.createAccountSuccess()
      }),
      catchError(errors => of(AuthActions.errorAction({ errors: errors })))))));

  login$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.login),
    mergeMap((action) => this.authApiService.login(action.payload).pipe(
      mergeMap(payload => {
        this.authService.setToken(payload)
        setTimeout(() => {
          this.router.navigate([''])
        }, 100);
        return [
          AuthActions.loginSuccess(),
          AuthActions.getUser()
        ]
      }),
      catchError(errors => of(AuthActions.errorAction({ errors: errors })))))));

  getUser$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.getUser),
    mergeMap((action) => this.authApiService.getUser().pipe(
      mergeMap(payload => {
        return [
          AuthActions.getUserSuccess({ payload }),
          FriendActions.getAllFriendRequests(),
          FriendActions.getAllFriends()
        ]
      }),
      catchError(errors => of(AuthActions.errorAction({ errors: errors })))))));

  uploadImage$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.uploadImage),
    mergeMap((action) => this.authApiService.uploadImage(action.formData).pipe(
      map(payload => AuthActions.uploadImageSuccess() ),
      catchError(errors => of(AuthActions.errorAction({ errors: errors })))))));

  logout$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.logout),
    map(() => {
      this.authService.removeToken(),
        this.router.navigateByUrl('/login')
    })
  ), { dispatch: false })

}
