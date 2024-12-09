import { createAction, props } from "@ngrx/store";
import {ActionBase} from "../common/action-base";

class Actions extends ActionBase {
  constructor(type:string) {super(type)}

  createAccount = createAction(
    `${this.type} Create Account`,
    props<{ payload: any }>()
  )

  createAccountSuccess = createAction(
    `${this.type} Create Account Success`,
    props<{ payload: any }>()
  )

}
export const AuthActions = new Actions('[Auth/API]')
