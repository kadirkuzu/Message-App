import { FriendRequest } from '@/app/models/friend-requets';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendRequestFilter'
})
export class FriendRequestFilterPipe implements PipeTransform {

  transform(items: FriendRequest[], searchText: string): FriendRequest[] {
    if (!items || !searchText) {
      return items
    }

    const lowerSearchText = searchText.toLowerCase();

    return items.filter(item => item.fullName.toLowerCase().includes(lowerSearchText) || item.userName.toLowerCase().includes(lowerSearchText)
    );
  }

}
