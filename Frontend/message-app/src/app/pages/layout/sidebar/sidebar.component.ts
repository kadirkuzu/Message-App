import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  searchTerm: string = '';
  selectedChat: any = null;
  newMessage: string = '';
  chats = [
    {
      name: 'Fatih',
      profileImage: 'assets/user1.jpg',
      lastMessage: 'Merhaba! Nasılsın?',
      messages: ['Merhaba!', 'Nasılsın?'],
    },
    {
      name: 'Ayşe',
      profileImage: 'assets/user2.jpg',
      lastMessage: 'Bugün buluşuyor muyuz?',
      messages: ['Bugün buluşuyor muyuz?', 'Saat kaçta?'],
    },
  ];

  get filteredChats() {
    return this.chats.filter(chat =>
      chat.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectChat(chat: any) {
    this.selectedChat = chat;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.selectedChat.messages.push(this.newMessage.trim());
      this.newMessage = '';
    }
  }
}
