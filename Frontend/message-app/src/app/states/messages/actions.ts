import { createAction, props } from "@ngrx/store";
import {Message} from "../../models/message";
import {ActionBase} from "../common/action-base";
import { SignalRData } from "@/app/models/signalR-data";

class Actions extends ActionBase {
  constructor(type:string) {super(type)}

  getAll = createAction(
    `${this.type} Get All`
  )

  getAllSuccess = createAction(
    `${this.type} Get All Success`,
    props<{ payload: Message[] }>()
  )

  addSignalR = createAction(
    `${this.type} AddSignalr`,
    props<{data:SignalRData}>()
  )
}
export const MessageActions = new Actions('[Messages/API]')
