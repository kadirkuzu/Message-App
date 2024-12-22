import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";
import {Store} from "@ngrx/store";
import {ChatActions} from "./actions";
import { ChatsApiService } from "@/app/services/api/chats.api.service";
import { SignalRService } from "@/app/services/signalR/signalR.service";

@Injectable()
export class ChatEffects {
  constructor(private actions$: Actions, private chatsApiService: ChatsApiService, private signalRService: SignalRService) {}

  getAll$ = createEffect(() => this.actions$.pipe(ofType(ChatActions.getAll),
    mergeMap((action) => this.chatsApiService.getAll().pipe(
      map(payload => {
        payload.forEach(x=>{
          this.signalRService.joinGroup(x.id)
        })

        return ChatActions.getAllSuccess({payload})
      }),
      catchError(errors => of(ChatActions.errorAction({errors:errors})))))));
}
