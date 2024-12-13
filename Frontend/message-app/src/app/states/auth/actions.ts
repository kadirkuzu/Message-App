import { createAction, props } from "@ngrx/store";
import {ActionBase} from "../common/action-base";
import { CreateAccountDto, LoginDto } from "@/app/models/auth";

class Actions extends ActionBase {
  constructor(type:string) {super(type)}

  createAccount = createAction(
    `${this.type} Create Account`,
    props<{ payload: CreateAccountDto }>()
  )

  createAccountSuccess = createAction(
    `${this.type} Create Account Success`
  )

  login = createAction(
    `${this.type} Login`,
    props<{ payload: LoginDto }>()
  )

  loginSuccess = createAction(
    `${this.type} Login Success`
  )

}
export const AuthActions = new Actions('[Auth/API]')
