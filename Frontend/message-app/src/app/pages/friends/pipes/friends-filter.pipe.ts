import { Friend } from '@/app/models/friend-requets';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendsFilter'
})
export class FriendsFilterPipe implements PipeTransform {

  transform(items: Friend[], searchText: string): Friend[] {
    if (!items || !searchText) {
      return items
    }

    const lowerSearchText = searchText.toLowerCase();

    return items.filter(item => 
      item.fullName.toLowerCase().includes(lowerSearchText) || 
      item.userName.toLowerCase().includes(lowerSearchText) ||
      item.email.toLowerCase().includes(lowerSearchText) ||
      item.phoneNumber.toLowerCase().includes(lowerSearchText)
    );
  }

}
