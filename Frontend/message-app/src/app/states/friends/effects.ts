import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";
import {Store} from "@ngrx/store";
import {FriendActions} from "./actions";
import { FriendsApiService } from "@/app/services/api/friends.api.service";

@Injectable()
export class FriendEffects {
  constructor(private actions$: Actions, private friendsApiService: FriendsApiService, private store: Store) {}

  getAll$ = createEffect(() => this.actions$.pipe(ofType(FriendActions.getAllFriendRequests),
    mergeMap((action) => this.friendsApiService.getFriendRequests().pipe(
      map(payload => FriendActions.getAllFriendRequestsSuccess({payload})),
      catchError(errors => of(FriendActions.errorAction({errors:errors})))))));
}
