export class User {
    id!:string
    email!:string
    phone!:string
    fullName!: string
    userName!: string
}

export class AddFriendRequestUser{
    id!:string
    fullName!: string
    userName!: string
    isFriend!: boolean
    isSended!: boolean
}