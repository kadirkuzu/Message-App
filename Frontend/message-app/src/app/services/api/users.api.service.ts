import {Injectable} from '@angular/core';
import {ApiService} from "./common/api.service";
import { BoolDto } from '@/app/models/common/bool';
import { UpdateUserDto, User } from '@/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  constructor(private apiService: ApiService) {}

  uploadImage(formData:FormData) {
    return this.apiService.post<BoolDto>(`users/upload-image`, formData);
  }

  update(payload:UpdateUserDto) {
    return this.apiService.post<User>(`users`, payload);
  }

  getUser() {
    return this.apiService.get<User>(`users/me`);
  }

}
