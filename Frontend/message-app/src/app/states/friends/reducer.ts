import {createEntityAdapter, EntityState} from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import {Message} from "../../models/message";
import {FriendActions as Actions} from "./actions";
import { FriendRequest } from "@/app/models/friend-requets";

export interface State {
  isLoading: number;
  friendRequests: FriendRequest[]
}

export const initialState: State = {
  isLoading: 0,
  friendRequests: []
}

export const reducer = createReducer(
  initialState,
  on(Actions.errorAction, (state, action) => ({ ...state, isLoading: action.dontChangeLoading ? state.isLoading  : state.isLoading - 1 })),
  on(Actions.getAllFriendRequests, (state) => ({ ...state, isLoading: state.isLoading + 1 })),
  on(Actions.getAllFriendRequestsSuccess, (state, { payload }) => ({ ...state, isLoading: state.isLoading - 1,friendRequests: payload })),
)
