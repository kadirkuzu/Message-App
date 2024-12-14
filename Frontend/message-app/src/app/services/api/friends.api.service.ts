import {Injectable} from '@angular/core';
import {ApiService} from "./common/api.service";
import { AddFriendRequestUser } from '@/app/models/user';
import { BoolDto } from '@/app/models/common/bool';
import { Friend, FriendRequest } from '@/app/models/friend-requets';

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

  getFriends() {
    return this.apiService.get<Friend[]>(`friends`);
  }

  approveFriendRequest(friendRequestId:string, senderId: string) {
    return this.apiService.post<Friend>(`friends/friend-requests/approve`, {friendRequestId, senderId});
  }

  rejectFriendRequest(friendRequestId:string, senderId: string) {
    return this.apiService.post<Friend>(`friends/friend-requests/reject`, {friendRequestId, senderId});
  }

}
