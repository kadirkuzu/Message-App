import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, adapter } from "./reducer";
import * as _ from "lodash";

const getState = createFeatureSelector<State>('chats');
const selectAdapter = adapter.getSelectors()

class Selector {

  getAll = createSelector(getState, selectAdapter.selectAll)

  getAllFiltered = createSelector(this.getAll, all => _.orderBy(all.filter(x=>!!x.lastMessage),x=>x.lastMessage.createdDate, "desc"))

  getActiveChat = createSelector(getState,this.getAll, (state,all) => all.find(x=>x.id == state.activeChatId))

  loading = createSelector(getState, (state: State) => state.isLoading > 0)

}

export const ChatsSelector = new Selector()

