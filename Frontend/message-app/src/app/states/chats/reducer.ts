import {createEntityAdapter, EntityState} from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import {ChatActions as Actions} from "./actions";
import { Chat } from "@/app/models/chat";
import { MessageActions } from "../messages/actions";

export interface State extends EntityState<Chat> {
  isLoading: number;
}

export const adapter = createEntityAdapter<Chat>();

export const initialState: State = adapter.getInitialState({
  isLoading: 0,
})

export const reducer = createReducer(
  initialState,
  on(Actions.errorAction, (state, action) => ({ ...state, isLoading: action.dontChangeLoading ? state.isLoading  : state.isLoading - 1 })),
  on(Actions.getAll, (state) => ({ ...state, isLoading: state.isLoading + 1 })),
  on(Actions.getAllSuccess, (state, { payload }) => {
    return adapter.addMany(payload, { ...state, isLoading: state.isLoading - 1 })
  }),
  on(MessageActions.addSignalR, (state, { data }) => {
    let message = data.object
    let chat = state.entities[message.chatId]

    if(!chat) return state
    return adapter.updateOne({
      id: message.chatId,
      changes: {
        lastMessage: message,
        unreadCount: chat?.unreadCount + 1,
      }
    },state)
  }),
)
