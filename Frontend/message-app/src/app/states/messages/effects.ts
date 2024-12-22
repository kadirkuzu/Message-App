import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";
import {Store} from "@ngrx/store";
import {MessagesApiService} from "../../services/api/messages.api.service";
import {MessageActions} from "./actions";

@Injectable()
export class MessageEffects {
  constructor(private actions$: Actions, private messagesApiService: MessagesApiService, private store: Store) {}

  getAll$ = createEffect(() => this.actions$.pipe(ofType(MessageActions.getAll),
    mergeMap((action) => this.messagesApiService.getAll(action.chatId).pipe(
      map(payload => MessageActions.getAllSuccess({payload})),
      catchError(errors => of(MessageActions.errorAction({errors:errors})))))));
}
