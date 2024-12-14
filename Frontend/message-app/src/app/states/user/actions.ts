import { createAction, props } from "@ngrx/store";
import {ActionBase} from "../common/action-base";
import { UpdateUserDto, User } from "@/app/models/user";

class Actions extends ActionBase {
  constructor(type:string) {super(type)}

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

  updateUser = createAction(
    `${this.type} Update User`,
    props<{payload:UpdateUserDto}>()
  )

  updateUserSuccess = createAction(
    `${this.type} Update User Success`,
    props<{payload:User}>()
  )

}
export const UserActions = new Actions('[User/API]')
