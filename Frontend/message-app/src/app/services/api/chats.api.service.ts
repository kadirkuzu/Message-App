import {Injectable} from '@angular/core';
import {ApiService} from "./common/api.service";
import { Chat } from '@/app/models/chat';
import { BoolDto } from '@/app/models/common/bool';

@Injectable({
  providedIn: 'root'
})
export class ChatsApiService {
  constructor(private apiService: ApiService) {}

  getAll() {
    return this.apiService.get<Chat[]>(`chats`);
  }

  add(payload : {userIds:string[], title:string}) {
    return this.apiService.post<Chat>(`chats` , payload);
  }

  uploadImage(chatId:string,formData:FormData) {
    return this.apiService.post<BoolDto>(`chats/${chatId}/upload-image`, formData);
  }

  updateTitle(chatId:string,title:string) {
    return this.apiService.put<Chat>(`chats/${chatId}/title`, {title});
  }
}
