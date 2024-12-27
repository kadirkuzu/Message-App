import { createAction, props } from "@ngrx/store";
import { ActionBase } from "../_common/action-base";
import { Chat } from "@/app/models/chat";
import { SignalRData } from "@/app/models/signalR-data";

class Actions extends ActionBase {
  constructor(type: string) { super(type) }

  getAll = createAction(
    `${this.type} Get All`
  )

  getAllSuccess = createAction(
    `${this.type} Get All Success`,
    props<{ payload: Chat[] }>()
  )

  addSignalR = createAction(
    `${this.type} Add SignalR`,
    props<{ data: SignalRData<Chat> }>()
  )

  add = createAction(
    `${this.type} Add`,
    props<{ payload: { userIds: string[], title: string, image?: File } }>()
  )

  addOne = createAction(
    `${this.type} Add One`,
    props<{ data: Chat }>()
  )

  uploadImage = createAction(
    `${this.type} Upload Image`,
    props<{ chatId: string, formData: FormData }>()
  )

  uploadImageSuccess = createAction(
    `${this.type} Upload Image Success`
  )

  addImageSignalR = createAction(
    `${this.type} Add Image SignalR`,
    props<{ data: SignalRData<{ id: string }> }>()
  )

  setImageLoading = createAction(
    `${this.type} Set Image Loading`,
    props<{ chatId: string, isLoading: boolean }>()
  )

  updateTitle = createAction(
    `${this.type} Update Title`,
    props<{ title: string }>()
  )

  updateTitleSuccess = createAction(
    `${this.type} Update Title Success`,
    props<{ payload: Chat }>()
  )

  updateTitleSignalR = createAction(
    `${this.type} Update Title SignalR`,
    props<{ data: SignalRData<Chat>}>()
  )
}
export const ChatActions = new Actions('[Chats/API]')
