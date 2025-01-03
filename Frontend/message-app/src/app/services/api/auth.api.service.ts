import {Injectable} from '@angular/core';
import {ApiService} from "./common/api.service";
import { CreateAccountDto, LoginDto, UserToken } from '@/app/models/auth';
import { BoolDto } from '@/app/models/common/bool';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private apiService: ApiService) {}

  createAccount(payload: CreateAccountDto) {
    return this.apiService.post<BoolDto>(`auth/create-account`, payload);
  }

  login(payload: LoginDto) {
    return this.apiService.post<UserToken>(`auth/login`, payload);
  }

  checkUserNameAvailable(userName: string) {
    return this.apiService.get<BoolDto>(`auth/check-user-name-available`, {userName});
  }

}
