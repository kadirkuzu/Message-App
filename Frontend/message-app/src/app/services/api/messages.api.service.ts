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
}
