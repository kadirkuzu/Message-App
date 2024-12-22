import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { UserActions } from "./actions";
import { FriendActions } from "../friends/actions";
import { UsersApiService } from "@/app/services/api/users.api.service";
import { ChatActions } from "../chats/actions";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private usersApiService: UsersApiService) { }

  getUser$ = createEffect(() => this.actions$.pipe(ofType(UserActions.getUser),
    mergeMap((action) => this.usersApiService.getUser().pipe(
      mergeMap(payload => {
        return [
          UserActions.getUserSuccess({ payload }),
          FriendActions.getAllFriendRequests(),
          FriendActions.getAllFriends(),
          ChatActions.getAll()
        ]
      }),
      catchError(errors => of(UserActions.errorAction({ errors: errors })))))));

  uploadImage$ = createEffect(() => this.actions$.pipe(ofType(UserActions.uploadImage),
    mergeMap((action) => this.usersApiService.uploadImage(action.formData).pipe(
      map(payload => UserActions.uploadImageSuccess() ),
      catchError(errors => of(UserActions.errorAction({ errors: errors })))))));

  updateUser$ = createEffect(() => this.actions$.pipe(ofType(UserActions.updateUser),
    mergeMap((action) => this.usersApiService.update(action.payload).pipe(
      map(payload => UserActions.updateUserSuccess({payload}) ),
      catchError(errors => of(UserActions.errorAction({ errors: errors })))))));

}
