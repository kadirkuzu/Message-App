using MessageApp.Domain.Entities.Common;

namespace MessageApp.Domain.Entities; 
public class Chat : BaseEntity
{
    public string Title { get; set; }
    public bool IsGroup { get; set; }
    public ICollection<User> Users { get; set; }
    public ICollection<Message> Messages { get; set; }
}
