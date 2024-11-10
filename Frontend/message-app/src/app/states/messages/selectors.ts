import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, adapter } from "./reducer";

const getState = createFeatureSelector<State>('messages');
const selectAdapter = adapter.getSelectors()

class Selector {

  getAll = createSelector(getState, selectAdapter.selectAll)

  loading = createSelector(getState, (state: State) => state.isLoading > 0)

}

export const MessagesSelector = new Selector()

