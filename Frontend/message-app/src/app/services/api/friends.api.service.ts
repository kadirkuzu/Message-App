import {Injectable} from '@angular/core';
import {ApiService} from "./common/api.service";
import { AddFriendRequestUser } from '@/app/models/user';
import { BoolDto } from '@/app/models/common/bool';
import { FriendRequest } from '@/app/models/friend-requets';

@Injectable({
  providedIn: 'root'
})
export class FriendsApiService {
  constructor(private apiService: ApiService) {}

  searchUsers(userName:string) {
    return this.apiService.get<AddFriendRequestUser[]>(`friends/search-users-by-name`, {userName});
  }

  sendFriendRequest(receiverId:string) {
    return this.apiService.post<BoolDto>(`friends/send-friend-request`, {receiverId});
  }

  getFriendRequests() {
    return this.apiService.get<FriendRequest[]>(`friends/friend-requests`);
  }

}
