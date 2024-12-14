import { createAction, props } from "@ngrx/store";
import {ActionBase} from "../common/action-base";
import { CreateAccountDto, LoginDto } from "@/app/models/auth";
import { User } from "@/app/models/user";

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

  getUser = createAction(
    `${this.type} Get User`
  )

  getUserSuccess = createAction(
    `${this.type} Get User Success`,
    props<{payload:User}>()
  )

  
  uploadImage = createAction(
    `${this.type} Upload Image`,
    props<{formData:FormData}>()
  )

  uploadImageSuccess = createAction(
    `${this.type} Upload Image Success`
  )

  logout = createAction(
    `${this.type} Logout`
  )

}
export const AuthActions = new Actions('[Auth/API]')
