import { createAction, props } from "@ngrx/store";
import {ActionBase} from "../common/action-base";

class Actions extends ActionBase {
  constructor(type:string) {super(type)}

  createAccount = createAction(
    `${this.type} Create Account`,
    props<{ payload: any }>()
  )

  createAccountSuccess = createAction(
    `${this.type} Create Account Success`
  )

  login = createAction(
    `${this.type} Login`,
    props<{ payload: any }>()
  )

  loginSuccess = createAction(
    `${this.type} Login Success`,
    props<{ token: string }>()
  )

}
export const AuthActions = new Actions('[Auth/API]')
