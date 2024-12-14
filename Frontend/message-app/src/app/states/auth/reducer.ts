import { createReducer, on } from "@ngrx/store";
import { AuthActions as Actions } from "./actions";
import { User } from "@/app/models/user";

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
  on(Actions.uploadImage, (state, action) => ({ ...state, uploadLoading: true })),
  on(Actions.uploadImageSuccess, (state, action) => ({ ...state, uploadLoading: false, activeUser: { ...state.activeUser!, hasPhoto: true } })),
  on(Actions.logout, (state, action) => ({ ...state, activeUser: undefined })),
)
