using Microsoft.AspNetCore.Identity;

namespace MessageApp.Domain.Entities; 
public class User : IdentityUser<Guid>
{
    public string FullName { get; set; }
    public string Status { get; set; }
    public ICollection<Chat> Chats { get; set; }
}
