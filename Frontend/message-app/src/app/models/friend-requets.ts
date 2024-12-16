export class FriendRequest {
    id!:string
    userId!:string
    createdDate!: Date
    userName!: string
    fullName!: string
    hasPhoto!: boolean
}

export class Friend {
    userId!:string
    createdDate!: Date
    userName!: string
    fullName!: string
    hasPhoto!: boolean
    phoneNumber!: string
    email!: string
    friendRequestId!: string
}