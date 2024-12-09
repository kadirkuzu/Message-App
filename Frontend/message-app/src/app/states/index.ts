import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as MessagesState from './messages/reducer';
import * as AuthState from './auth/reducer';

export interface State {
  auth: AuthState.State,
  messages: MessagesState.State,
  router: RouterReducerState,
}

export const reducers: ActionReducerMap<State> = {
  auth: AuthState.reducer,
  messages: MessagesState.reducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = []
