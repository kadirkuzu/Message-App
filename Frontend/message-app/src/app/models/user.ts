export class User {
    id!:string
    email!:string
    phoneNumber!:string
    fullName!: string
    userName!: string
    hasPhoto!: boolean
    roles!: Role[]
}

export type Role = 'SuperAdmin' | 'Admin' | 'User'

export class AddFriendRequestUser{
    id!:string
    fullName!: string
    userName!: string
    isFriend!: boolean
    isSended!: boolean
    isReceived!: boolean
    hasPhoto!: boolean
    friendRequestId?: string
}

export class UpdateUserDto {
    email!:string
    userName!:string
    fullName!:string
    phoneNumber!:string
}