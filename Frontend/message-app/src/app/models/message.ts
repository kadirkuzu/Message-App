import {Entity} from "./common/entity";

export class Message extends Entity {
  senderId!: string
  chatId!: string
  content!: string
  isRead!: boolean
}
