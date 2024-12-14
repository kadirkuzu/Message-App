import { createReducer, on } from "@ngrx/store";
import {FriendActions as Actions} from "./actions";
import { Friend, FriendRequest } from "@/app/models/friend-requets";

export interface State {
  isLoading: number;
  friendRequests: FriendRequest[];
  friends: Friend[]
}

export const initialState: State = {
  isLoading: 0,
  friendRequests: [],
  friends: []
}

export const reducer = createReducer(
  initialState,
  on(Actions.errorAction, (state, action) => ({ ...state, isLoading: action.dontChangeLoading ? state.isLoading  : state.isLoading - 1 })),
  on(Actions.getAllFriendRequests, (state) => ({ ...state, isLoading: state.isLoading + 1 })),
  on(Actions.getAllFriendRequestsSuccess, (state, { payload }) => ({ ...state, isLoading: state.isLoading - 1,friendRequests: payload })),
  on(Actions.getAllFriends, (state) => ({ ...state, isLoading: state.isLoading + 1 })),
  on(Actions.getAllFriendsSuccess, (state, { payload }) => ({ ...state, isLoading: state.isLoading - 1,friends: payload })),
  on(Actions.addFriendRequestSignalR, (state, { data }) => ({ ...state, friendRequests: [data.object as FriendRequest,...state.friendRequests] })),
  on(Actions.addFriendSignalR, (state, { data }) => ({ ...state, friends: [data.object as Friend,...state.friends], friendRequests: state.friendRequests.filter(x=>x.userId != (data.object as Friend).userId) })),
  on(Actions.approveFriendRequestSuccess, (state, {friend}) => ({ ...state, friends: [friend,...state.friends], friendRequests: state.friendRequests.filter(x=>x.userId != friend.userId) })),
)
