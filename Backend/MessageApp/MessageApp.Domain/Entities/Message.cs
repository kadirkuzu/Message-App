﻿using MessageApp.Domain.Entities.Common;

namespace MessageApp.Domain.Entities; 
public class Message : BaseEntity
{
    public Guid SenderId { get; set; }
    public User Sender { get; set; }
    public Guid ChatId { get; set; }
    public Chat Chat { get; set; }
    public string Content { get; set; }
    public bool IsRead { get; set; }

    public Message()
    {
        
    }

    public Message(User sender,Guid chatId,string content)
    {
        SenderId = sender.Id;
        ChatId = chatId;
        Content = content;
        IsRead = false;
    }

    public void Read()
    {
        IsRead = true;
    }
}
