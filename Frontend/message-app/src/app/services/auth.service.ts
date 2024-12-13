import { Injectable } from '@angular/core';
import { UserToken } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    getToken() {
        return localStorage.getItem('accessToken')
    }

    setToken (token: UserToken) {
        localStorage.setItem('accessToken',token.accessToken)
        localStorage.setItem('refreshToken',token.refreshToken)
    }

    removeToken () {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    isLoggedIn () {
        return !!this.getToken()
    }
}
