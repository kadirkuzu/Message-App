import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./reducer";

const getState = createFeatureSelector<State>('auth');

class Selector {

  loading = createSelector(getState, (state: State) => state.isLoading > 0)
  activeUser = createSelector(getState, (state: State) => state.activeUser)
  loggedIn = createSelector(getState, (state: State) => !!state.activeUser)
  uploadLoading = createSelector(getState, (state: State) => state.uploadLoading)

}

export const AuthSelector = new Selector()

