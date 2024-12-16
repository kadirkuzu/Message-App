import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";
import {Store} from "@ngrx/store";
import {FriendActions} from "./actions";
import { FriendsApiService } from "@/app/services/api/friends.api.service";

@Injectable()
export class FriendEffects {
  constructor(private actions$: Actions, private friendsApiService: FriendsApiService, private store: Store) {}

  getAllFriendRequests$ = createEffect(() => this.actions$.pipe(ofType(FriendActions.getAllFriendRequests),
    mergeMap((action) => this.friendsApiService.getFriendRequests().pipe(
      map(payload => FriendActions.getAllFriendRequestsSuccess({payload})),
      catchError(errors => of(FriendActions.errorAction({errors:errors})))))));

  getAllFriends$ = createEffect(() => this.actions$.pipe(ofType(FriendActions.getAllFriends),
    mergeMap((action) => this.friendsApiService.getFriends().pipe(
      map(payload => FriendActions.getAllFriendsSuccess({payload})),
      catchError(errors => of(FriendActions.errorAction({errors:errors})))))));

  approveFriendRequest$ = createEffect(() => this.actions$.pipe(ofType(FriendActions.approveFriendRequest),
    mergeMap((action) => this.friendsApiService.approveFriendRequest(action.friendRequestId,action.senderId).pipe(
      map(friend => FriendActions.approveFriendRequestSuccess({friend})),
      catchError(errors => of(FriendActions.errorAction({errors:errors})))))));

  rejectFriendRequest$ = createEffect(() => this.actions$.pipe(ofType(FriendActions.rejectFriendRequest),
    mergeMap((action) => this.friendsApiService.rejectFriendRequest(action.friendRequestId,action.senderId).pipe(
      map(payload => FriendActions.rejectFriendRequestSuccess(payload)),
      catchError(errors => of(FriendActions.errorAction({errors:errors})))))));
}
