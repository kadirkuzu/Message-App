import { createReducer, on } from "@ngrx/store";
import {AuthActions as Actions} from "./actions";
import { User } from "@/app/models/user";

export interface State {
  isLoading: number;
  activeUser?:User
}

export const initialState: State = {
  isLoading: 0,
  activeUser: undefined
}

export const reducer = createReducer(
  initialState,
  on(Actions.errorAction, (state, action) => ({ ...state, isLoading: action.dontChangeLoading ? state.isLoading  : state.isLoading - 1 })),
  on(Actions.getUserSuccess, (state, action) => ({ ...state, activeUser: action.payload })),
  on(Actions.logout, (state, action) => ({ ...state, activeUser: undefined })),
)
