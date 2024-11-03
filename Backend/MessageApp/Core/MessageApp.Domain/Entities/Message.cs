using MessageApp.Domain.Entities.Common;

namespace MessageApp.Domain.Entities; 
public class Message : BaseEntity
{
    public Guid SenderId { get; set; }
    public User Sender { get; set; }
    public Guid ChatId { get; set; }
    public string Content { get; set; }
    public bool IsRead { get; set; }
}
