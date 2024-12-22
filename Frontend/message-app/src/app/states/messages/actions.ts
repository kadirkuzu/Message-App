import { createAction, props } from "@ngrx/store";
import {Message} from "../../models/message";
import {ActionBase} from "../_common/action-base";
import { SignalRData } from "@/app/models/signalR-data";

class Actions extends ActionBase {
  constructor(type:string) {super(type)}

  getAll = createAction(
    `${this.type} Get All`,
    props<{ chatId: string }>()
  )

  getAllSuccess = createAction(
    `${this.type} Get All Success`,
    props<{ payload: Message[] }>()
  )

  addSignalR = createAction(
    `${this.type} AddSignalr`,
    props<{data:SignalRData<Message>}>()
  )

  sendMessage = createAction(
    `${this.type} Send Message`,
    props<{ content: string }>()
  )

  sendMessageSuccess = createAction(
    `${this.type} Send Message Success`,
    props<{ payload: Message }>()
  )
}
export const MessageActions = new Actions('[Messages/API]')
