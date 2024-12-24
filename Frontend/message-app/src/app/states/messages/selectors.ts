import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, adapter } from "./reducer";
import { decryptMessage } from "@/app/common/helpers/message-helpers";

const getState = createFeatureSelector<State>('messages');
const selectAdapter = adapter.getSelectors()

class Selector {

  all = createSelector(getState, selectAdapter.selectAll)

  getAll = createSelector(this.all, all => all.map(x=>({...x,content: decryptMessage(x.content)})))

  loading = createSelector(getState, (state: State) => state.isLoading > 0)

}

export const MessagesSelector = new Selector()

