import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./reducer";

const getState = createFeatureSelector<State>('friends');

class Selector {

  loading = createSelector(getState, (state: State) => state.isLoading > 0)

  friendRequests = createSelector(getState, (state: State) => state.friendRequests)

}

export const FriendsSelector = new Selector()

