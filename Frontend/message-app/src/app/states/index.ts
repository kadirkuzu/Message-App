import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as MessagesState from './messages/reducer';
import * as AuthState from './auth/reducer';
import * as FriendsState from './friends/reducer';
import * as UserState from './user/reducer';

export interface State {
  auth: AuthState.State,
  friends: FriendsState.State,
  messages: MessagesState.State,
  users: UserState.State,
  router: RouterReducerState,
}

export const reducers: ActionReducerMap<State> = {
  auth: AuthState.reducer,
  friends: FriendsState.reducer,
  messages: MessagesState.reducer,
  users: UserState.reducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = []
