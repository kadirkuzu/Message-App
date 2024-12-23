import { Chat } from '@/app/models/chat';
import { Friend } from '@/app/models/friend-requets';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatsFilter'
})
export class ChatsFilterPipe implements PipeTransform {

  transform(items: Chat[], searchText: string): Chat[] {
    if (!items || !searchText) {
      return items
    }

    const lowerSearchText = searchText.toLowerCase();

    return items.filter(item => 
      item.title?.toLowerCase().includes(lowerSearchText) || 
      item.users.some(x=>x.fullName.toLowerCase().includes(lowerSearchText)) || 
      item.users.some(x=>x.userName.toLowerCase().includes(lowerSearchText)) || 
      item.users.some(x=>x.email.toLowerCase().includes(lowerSearchText)) || 
      item.users.some(x=>x.phoneNumber.toLowerCase().includes(lowerSearchText))
    );
  }

}
