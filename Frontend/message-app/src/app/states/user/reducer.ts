import { createReducer, on } from "@ngrx/store";
import { UserActions as Actions } from "./actions";
import { User } from "@/app/models/user";
import { AuthActions } from "../auth/actions";

export interface State {
  isLoading: number;
  activeUser?: User;
  uploadLoading: boolean;
}

export const initialState: State = {
  isLoading: 0,
  activeUser: undefined,
  uploadLoading: false
}

export const reducer = createReducer(
  initialState,
  on(Actions.errorAction, (state, action) => ({ ...state, isLoading: action.dontChangeLoading ? state.isLoading : state.isLoading - 1 })),
  on(Actions.getUserSuccess, (state, action) => ({ ...state, activeUser: action.payload })),
  on(Actions.uploadImage, (state) => ({ ...state, uploadLoading: true })),
  on(Actions.uploadImageSuccess, (state) => ({ ...state, uploadLoading: false, activeUser: { ...state.activeUser!, hasPhoto: true } })),
  on(Actions.updateUser, (state) => ({ ...state })),
  on(Actions.updateUserSuccess, (state, action) => ({ ...state, activeUser: action.payload })),
  on(AuthActions.logout, (state, action) => ({ ...state, activeUser: undefined })),
)
