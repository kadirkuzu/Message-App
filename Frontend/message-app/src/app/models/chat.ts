import { Message } from "./message"
import { User } from "./user"

export class Chat {
    id!: string
    title!:string
    isGroup!: boolean
    hasImage!: boolean
    createdDate!: Date
    users!: User[]
    unreadCount!: number
    lastMessage!: Message
}