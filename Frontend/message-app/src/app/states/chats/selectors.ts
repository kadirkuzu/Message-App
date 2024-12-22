import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, adapter } from "./reducer";

const getState = createFeatureSelector<State>('chats');
const selectAdapter = adapter.getSelectors()

class Selector {

  getAll = createSelector(getState, selectAdapter.selectAll)

  getAllFiltered = createSelector(this.getAll, all => all.filter(x=>!!x.lastMessage))

  loading = createSelector(getState, (state: State) => state.isLoading > 0)

}

export const ChatsSelector = new Selector()

