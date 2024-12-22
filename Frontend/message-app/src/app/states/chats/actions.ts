import { createAction, props } from "@ngrx/store";
import {ActionBase} from "../_common/action-base";
import { Chat } from "@/app/models/chat";

class Actions extends ActionBase {
  constructor(type:string) {super(type)}

  getAll = createAction(
    `${this.type} Get All`
  )

  getAllSuccess = createAction(
    `${this.type} Get All Success`,
    props<{ payload: Chat[] }>()
  )
}
export const ChatActions = new Actions('[Chats/API]')
