import { Friend } from '@/app/models/friend-requets';
import { ChatActions } from '@/app/states/chats/actions';
import { ChatsSelector } from '@/app/states/chats/selectors';
import { FriendsSelector } from '@/app/states/friends/selectors';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-chat-page',
  templateUrl: './create-chat-page.component.html',
  styleUrl: './create-chat-page.component.scss'
})
export class CreateChatPageComponent {
  friends$ = this.store.select(FriendsSelector.friends)
  chats$ = this.store.select(ChatsSelector.getAll)

  activeTab: 'new-group' | 'new-message' = 'new-message'

  formGroup = new FormGroup({
    searchFriend: new FormControl(),
    title: new FormControl('', Validators.required)
  })

  get searchFriend() { return this.formGroup.controls.searchFriend }
  get title() { return this.formGroup.controls.title }

  selectedList: Friend[] = []

  groupImageFile?: File
  groupImagePreview?: string

  constructor(private store: Store, private router: Router) { }

  route(userId: string) {
    this.chats$.pipe(take(1)).subscribe(chats => {
      let chat = chats.find(x => x.users.length == 1 && x.users[0].id == userId)
      this.router.navigateByUrl('chats/' + chat?.id)
    })
  }

  changeTab(tab: 'new-group' | 'new-message') {
    this.activeTab = tab
    this.searchFriend.reset()
    this.groupImagePreview = undefined
    this.groupImageFile = undefined
  }

  addRemoveToList(friend: Friend) {
    if (this.isSelected(friend.userId)) {
      this.selectedList = this.selectedList.filter(x => x.userId != friend.userId)
    } else {
      this.selectedList.push(friend)
    }
  }

  isSelected(userId: string) {
    return this.selectedList.some(x => x.userId == userId)
  }

  onClick(friend: Friend) {
    if (this.activeTab == 'new-group') {
      this.addRemoveToList(friend)
    } else this.route(friend.userId)
  }

  uploadImage(data: { file: File, preview: string }) {
    this.groupImagePreview = data.preview
    this.groupImageFile = data.file
  }

  create() {
    if (this.formGroup.invalid) return this.formGroup.markAllAsTouched()
    
    let payload = {
      userIds: this.selectedList.map(x=>x.userId),
      title: this.title.value ?? '',
      image: this.groupImageFile
    }
    
    this.store.dispatch(ChatActions.add({payload}))

  }

}
