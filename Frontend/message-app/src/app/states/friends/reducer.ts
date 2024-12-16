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
  on(Actions.addFriendRequestSignalR, (state, { data }) => ({ ...state, friendRequests: [data.object,...state.friendRequests] })),
  on(Actions.removeFriendRequestSignalR, (state, { data }) => ({ ...state, friendRequests: state.friendRequests.filter(x=>x.id != data.object.id) })),
  on(Actions.rejectFriendRequestSuccess, (state, { id }) => ({ ...state, friendRequests: state.friendRequests.filter(x=>x.id != id) })),
  on(Actions.addFriendSignalR, (state, { data }) => ({ ...state, friends: [data.object,...state.friends], friendRequests: state.friendRequests.filter(x=>x.userId != data.object.userId) })),
  on(Actions.approveFriendRequestSuccess, (state, {friend}) => ({ ...state, friends: [friend,...state.friends], friendRequests: state.friendRequests.filter(x=>x.userId != friend.userId) })),
)
