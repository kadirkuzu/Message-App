using MessageApp.Domain.Entities.Common;

namespace MessageApp.Domain.Entities; 
public class User : BaseEntity
{
    public string Name { get; set; }
    public string DisplayName { get; set; }
    public string Status { get; set; }
    public ICollection<Chat> Chats { get; set; }
}
