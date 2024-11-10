import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as MessagesState from './messages/reducer';

export interface State {
  messages: MessagesState.State,
  router: RouterReducerState,
}

export const reducers: ActionReducerMap<State> = {
  messages: MessagesState.reducer,
  router: routerReducer,

};

export const metaReducers: MetaReducer<State>[] = []
