import {createAction, props} from "@ngrx/store";
export class ActionBase {
  type:string
  errorAction
  clearAction
  constructor(type:string) {
    this.type = type
    this.errorAction = createAction(
      `${this.type} Error`,
      props<{ errors: string[], dontChangeLoading?:boolean }>()
    )
    this.clearAction = createAction(
      `${this.type} Clear State`,
    )
  }
}
