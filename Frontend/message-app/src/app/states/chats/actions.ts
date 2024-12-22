import { createAction, props } from "@ngrx/store";
import {ActionBase} from "../_common/action-base";
import { Chat } from "@/app/models/chat";
import { Message } from "@/app/models/message";
import { SignalRData } from "@/app/models/signalR-data";

class Actions extends ActionBase {
  constructor(type:string) {super(type)}

  getAll = createAction(
    `${this.type} Get All`
  )

  getAllSuccess = createAction(
    `${this.type} Get All Success`,
    props<{ payload: Chat[] }>()
  )

  addSignalR = createAction (
    `${this.type} Add SignalR`,
    props<{ data: SignalRData<Chat> }>()
  )

  addOne= createAction (
    `${this.type} Add SignalR`,
    props<{ data: Chat }>()
  )
}
export const ChatActions = new Actions('[Chats/API]')
