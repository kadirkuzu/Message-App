import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";
import {AuthActions} from "./actions";
import { AuthService } from "@/app/services/api/auth.service";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  createAccount$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.createAccount),
    mergeMap((action) => this.authService.createAccount(action.payload).pipe(
      map(payload => AuthActions.createAccountSuccess()),
      catchError(errors => of(AuthActions.errorAction({errors:errors})))))));

  login = createEffect(() => this.actions$.pipe(ofType(AuthActions.login),
    mergeMap((action) => this.authService.login(action.payload).pipe(
      map(payload => AuthActions.loginSuccess(payload)),
      catchError(errors => of(AuthActions.errorAction({errors:errors})))))));
}