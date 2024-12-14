export class FriendRequest {
    id!:string
    userId!:string
    createdDate!: Date
    userName!: string
    fullName!: string
}

export class Friend extends FriendRequest {
    phoneNumber!: string
    email!: string
}