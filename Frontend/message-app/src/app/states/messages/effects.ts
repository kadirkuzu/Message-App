import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";
import {Store} from "@ngrx/store";
import {MessagesService} from "../../services/messages.service";
import {MessageActions} from "./actions";

@Injectable()
export class MessageEffects {
  constructor(private actions$: Actions, private messagesService: MessagesService, private store: Store) {}

  getAll$ = createEffect(() => this.actions$.pipe(ofType(MessageActions.getAll),
    mergeMap((action) => this.messagesService.getAll().pipe(
      map(client => MessageActions.getAllSuccess({payload: client})),
      catchError(errors => of(MessageActions.errorAction({errors:errors})))))));
}
