import {createEntityAdapter, EntityState} from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import {Message} from "../../models/message";
import {MessageActions as Actions} from "./actions";

export interface State extends EntityState<Message> {
  isLoading: number;
  activeChatId?: string
}

export const adapter = createEntityAdapter<Message>();

export const initialState: State = adapter.getInitialState({
  isLoading: 0,
  activeChatId: undefined
})

export const reducer = createReducer(
  initialState,
  on(Actions.errorAction, (state, action) => ({ ...state, isLoading: action.dontChangeLoading ? state.isLoading  : state.isLoading - 1 })),
  on(Actions.getAll, (state,action) => ({ ...state, isLoading: state.isLoading + 1, activeChatId: action.chatId })),
  on(Actions.getAllSuccess, (state, { payload }) => {
    return adapter.addMany(payload, { ...state, isLoading: state.isLoading - 1 })
  }),
  on(Actions.addSignalR, (state, { data }) => {
    let message = data.object
    if(message.chatId == state.activeChatId) {
      return adapter.addOne(message, state)
    } else return state
  }),
)
