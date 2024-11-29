import { createAction, props } from "@ngrx/store";
import {Message} from "../../models/message";
import {ActionBase} from "../common/action-base";

class Actions extends ActionBase {
  constructor(type:string) {super(type)}

  getAll = createAction(
    `${this.type} Get All`
  )

  getAllSuccess = createAction(
    `${this.type} Get All Success`,
    props<{ payload: Message[] }>()
  )
}
export const MessageActions = new Actions('[Messages/API]')
