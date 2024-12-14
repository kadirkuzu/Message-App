export class User {
    id!:string
    email!:string
    phoneNumber!:string
    fullName!: string
    userName!: string
    hasPhoto!: boolean
}

export class AddFriendRequestUser{
    id!:string
    fullName!: string
    userName!: string
    isFriend!: boolean
    isSended!: boolean
    hasPhoto!: boolean
}

export class UpdateUserDto {
    email!:string
    userName!:string
    fullName!:string
    phoneNumber!:string
}