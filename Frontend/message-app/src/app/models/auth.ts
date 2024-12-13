export class CreateAccountDto {
    email!:string
    userName!:string
    fullName!:string
    phoneNumber!:string
    password!:string
}

export class LoginDto {
    emailOrUserName!:string
    password!:string
}

export class UserToken {
    accessToken!: string
    refreshToken!: string
    expiration!: Date
}