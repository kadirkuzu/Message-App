import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./reducer";

const getState = createFeatureSelector<State>('auth');

class Selector {

  loading = createSelector(getState, (state: State) => state.isLoading > 0)

}

export const AuthSelector = new Selector()

