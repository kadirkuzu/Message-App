import {Injectable} from '@angular/core';
import {Message} from "../../models/message";
import {ApiService} from "./common/api.service";
import { encryptMessage } from '@/app/common/helpers/message-helpers';

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService {
  constructor(private apiService: ApiService) {}

  getAll(chatId:string) {
    return this.apiService.get<Message[]>(`messages/${chatId}`);
  }

  sendMessage(chatId:string,content:string) {    
    content = encryptMessage(content)
    return this.apiService.post<Message>(`messages`, {chatId,content});
  }

  sendMessageToAll(content:string) {
    content = encryptMessage(content)
    return this.apiService.post<Message>(`messages/send-to-all`, {content});
  }
}
