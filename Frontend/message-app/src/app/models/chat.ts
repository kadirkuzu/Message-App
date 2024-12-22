import { Message } from "./message"
import { User } from "./user"

export class Chat {
    id!: string
    title!:string
    isGroup!: boolean
    hasImage!: boolean
    createdDate!: string
    users!: User[]
    unreadCount!: number
    lastMessage!: Message
}