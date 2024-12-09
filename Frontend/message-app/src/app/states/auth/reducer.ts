import { createReducer, on } from "@ngrx/store";
import {AuthActions as Actions} from "./actions";

export interface State {
  isLoading: number;
}

export const initialState: State = {
  isLoading: 0,
}

export const reducer = createReducer(
  initialState,
  on(Actions.errorAction, (state, action) => ({ ...state, isLoading: action.dontChangeLoading ? state.isLoading  : state.isLoading - 1 }))
)
