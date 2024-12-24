import {Entity} from "./common/entity";
import { User } from "./user";

export class Message extends Entity {
  sender!: User
  chatId!: string
  content!: string
  isRead!: boolean
  isEncrypted!: boolean
}
