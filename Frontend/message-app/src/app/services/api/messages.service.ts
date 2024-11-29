import {Injectable} from '@angular/core';
import {Message} from "../../models/message";
import {ApiService} from "./common/api.service";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private apiService: ApiService) {}

  getAll() {
    return this.apiService.get<Message[]>(`messages`);
  }
}
