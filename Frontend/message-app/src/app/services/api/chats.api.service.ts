import {Injectable} from '@angular/core';
import {ApiService} from "./common/api.service";
import { Chat } from '@/app/models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatsApiService {
  constructor(private apiService: ApiService) {}

  getAll() {
    return this.apiService.get<Chat[]>(`chats`);
  }
}
