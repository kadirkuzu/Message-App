import {Injectable} from '@angular/core';
import {Message} from "../../models/message";
import {ApiService} from "./common/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  createAccount(payload: any) {
    return this.apiService.post<any>(`auth/create-account`, payload);
  }
  login(payload: any) {
    return this.apiService.post<{token : string}>(`auth/login`, payload);
  }
}
