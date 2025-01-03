import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { ChatActions } from "./actions";
import { ChatsApiService } from "@/app/services/api/chats.api.service";
import { SignalRService } from "@/app/services/signalR/signalR.service";
import { UserSelector } from "../user/selectors";
import { Router } from "@angular/router";
import { ChatsSelector } from "./selectors";

@Injectable()
export class ChatEffects {
  constructor(private actions$: Actions, private chatsApiService: ChatsApiService, private signalRService: SignalRService, private store: Store, private router: Router) { }

  getAll$ = createEffect(() => this.actions$.pipe(ofType(ChatActions.getAll),
    mergeMap((action) => this.chatsApiService.getAll().pipe(
      map(payload => {
        payload.forEach(x => {
          this.signalRService.joinGroup(x.id)
        })

        return ChatActions.getAllSuccess({ payload })
      }),
      catchError(errors => of(ChatActions.errorAction({ errors: errors })))))));

  addSignalR$ = createEffect(() => this.actions$.pipe(ofType(ChatActions.addSignalR),
    withLatestFrom(this.store.select(UserSelector.activeUser)),
    map(([action, user]) => {
      let chat = action.data.object
      this.signalRService.joinGroup(action.data.object.id)
      return ChatActions.addOne({ data: { ...chat, users: chat.users.filter(x => x.id != user?.id) } })
    })));

  add$ = createEffect(() => this.actions$.pipe(ofType(ChatActions.add),
    mergeMap((action) => this.chatsApiService.add(action.payload).pipe(
      mergeMap(data => {
        if (action.payload.image) {
          let formData = new FormData()
          formData.append(data.id, action.payload.image)
          this.store.dispatch(ChatActions.uploadImage({ chatId: data.id, formData }))
        }
        this.router.navigateByUrl('chats/' + data.id)
        this.signalRService.joinGroup(data.id)
        return EMPTY
      }),
      catchError(errors => of(ChatActions.errorAction({ errors: errors })))))));

  uploadImage$ = createEffect(() => this.actions$.pipe(ofType(ChatActions.uploadImage),
    mergeMap((action) => this.chatsApiService.uploadImage(action.chatId, action.formData).pipe(
      map(payload => ChatActions.uploadImageSuccess()),
      catchError(errors => of(ChatActions.errorAction({ errors: errors })))))));

  updateTitle$ = createEffect(() => this.actions$.pipe(ofType(ChatActions.updateTitle),
    withLatestFrom(this.store.select(ChatsSelector.getActiveChat)),
    mergeMap(([action,chat]) => this.chatsApiService.updateTitle(chat!.id, action.title).pipe(
      map(payload => ChatActions.updateTitleSuccess({payload})),
      catchError(errors => of(ChatActions.errorAction({ errors: errors })))))));

  addImageSignalRlogout$ = createEffect(() => this.actions$.pipe(ofType(ChatActions.addImageSignalR),
      tap((action)=> {
        this.store.dispatch(ChatActions.setImageLoading({chatId: action.data.object.id, isLoading: true}))

        setTimeout(() => {
          this.store.dispatch(ChatActions.setImageLoading({chatId: action.data.object.id, isLoading: false}))
        }, 0);
      })
  ), { dispatch: false })
}
