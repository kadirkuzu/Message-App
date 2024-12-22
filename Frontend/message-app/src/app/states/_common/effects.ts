import { AuthEffects } from "../auth/effects";
import { ChatEffects } from "../chats/effects";
import { FriendEffects } from "../friends/effects";
import {MessageEffects} from "../messages/effects";
import { UserEffects } from "../user/effects";

export const effects = [
  MessageEffects,
  AuthEffects,
  FriendEffects,
  UserEffects,
  ChatEffects
]
