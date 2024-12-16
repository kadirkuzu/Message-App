import {Injectable} from '@angular/core';
import {ApiService} from "./common/api.service";
import { BoolDto } from '@/app/models/common/bool';
import { Friend, FriendRequest } from '@/app/models/friend-requets';

@Injectable({
  providedIn: 'root'
})
export class FriendsApiService {
  constructor(private apiService: ApiService) {}

  sendFriendRequest(receiverId:string) {
    return this.apiService.post<BoolDto>(`friends/friend-requests/send`, {receiverId});
  }

  cancelFriendRequest(receiverId:string) {
    return this.apiService.post<BoolDto>(`friends/friend-requests/cancel`, {receiverId});
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
