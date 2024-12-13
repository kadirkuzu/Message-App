import { AuthEffects } from "../auth/effects";
import { FriendEffects } from "../friends/effects";
import {MessageEffects} from "../messages/effects";

export const effects = [
  MessageEffects,
  AuthEffects,
  FriendEffects
]
