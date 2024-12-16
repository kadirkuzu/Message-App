import { createAction, props } from "@ngrx/store";
import {ActionBase} from "../common/action-base";
import { Friend, FriendRequest } from "@/app/models/friend-requets";
import { SignalRData } from "@/app/models/signalR-data";

class Actions extends ActionBase {
  constructor(type:string) {super(type)}

  getAllFriends = createAction(
    `${this.type} Get All Friends`
  )

  getAllFriendsSuccess = createAction(
    `${this.type} Get All Friends Success`,
    props<{ payload: Friend[] }>()
  )

  getAllFriendRequests = createAction(
    `${this.type} Get All Friend Requests`
  )

  getAllFriendRequestsSuccess = createAction(
    `${this.type} Get All Friend Requests Success`,
    props<{ payload: FriendRequest[] }>()
  )

  addFriendRequestSignalR = createAction (
    `${this.type} Add Friend Request SignalR`,
    props<{ data: SignalRData<FriendRequest> }>()
  )

  removeFriendRequestSignalR = createAction (
    `${this.type} Remove Friend Request SignalR`,
    props<{ data: SignalRData<{id:string}> }>()
  )

  addFriendSignalR = createAction (
    `${this.type} Add Friend SignalR`,
    props<{ data: SignalRData<Friend> }>()
  )

  approveFriendRequest = createAction (
    `${this.type} Approve Friend Request`,
    props<{ friendRequestId:string, senderId: string}>()
  )

  approveFriendRequestSuccess = createAction (
    `${this.type} Approve Friend Request Success`,
    props<{ friend: Friend}>()
  )

  rejectFriendRequest = createAction (
    `${this.type} Reject Friend Request`,
    props<{ friendRequestId:string, senderId: string}>()
  )

  rejectFriendRequestSuccess = createAction (
    `${this.type} Reject Friend Request Success`,
    props<{ id: string}>()
  )
}
export const FriendActions = new Actions('[Friends/API]')
