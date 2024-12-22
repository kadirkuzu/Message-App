using MessageApp.Domain.Entities.Common;

namespace MessageApp.Domain.Entities; 
public class Chat : BaseEntity
{
    public string? Title { get; set; }
    public bool IsGroup { get; set; }
    public bool HasImage { get; set; }
    public int UnreadCount { get; set; }
    public Guid? LastMessageId { get; set; }
    public ICollection<User> Users { get; set; } = new List<User>();
    public ICollection<Message> Messages { get; set; } = new List<Message>();

    public Chat() { }
    public Chat(List<User> users,bool isGroup)
    {
        Users = users;
        IsGroup = isGroup;
        HasImage = false;
        UnreadCount = 0;
    }

    public void ReadAll()
    {
        UnreadCount = 0;
    }

    public void AddMessage(Guid messageId)
    {
        LastMessageId = messageId;
        UnreadCount++;
    }
}
