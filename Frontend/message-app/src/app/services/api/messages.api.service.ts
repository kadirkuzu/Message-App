import {Injectable} from '@angular/core';
import {Message} from "../../models/message";
import {ApiService} from "./common/api.service";

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService {
  constructor(private apiService: ApiService) {}

  getAll(chatId:string) {
    return this.apiService.get<Message[]>(`messages/${chatId}`);
  }

  sendMessage(chatId:string,content:string) {
    return this.apiService.post<Message>(`messages`, {chatId,content});
  }
}
