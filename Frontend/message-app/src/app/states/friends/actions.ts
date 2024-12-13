import { createAction, props } from "@ngrx/store";
import {ActionBase} from "../common/action-base";
import { FriendRequest } from "@/app/models/friend-requets";

class Actions extends ActionBase {
  constructor(type:string) {super(type)}

  getAllFriendRequests = createAction(
    `${this.type} Get All Friend Requests`
  )

  getAllFriendRequestsSuccess = createAction(
    `${this.type} Get All Friend Requests Success`,
    props<{ payload: FriendRequest[] }>()
  )
}
export const FriendActions = new Actions('[Friends/API]')
