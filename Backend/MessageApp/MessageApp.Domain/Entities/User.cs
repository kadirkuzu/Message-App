using Microsoft.AspNetCore.Identity;

namespace MessageApp.Domain.Entities; 
public class User : IdentityUser<Guid>
{
    public string FullName { get; set; }
    public string? Status { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenEndDate { get; set; }
    public ICollection<Chat> Chats { get; set; }
    public bool HasPhoto { get; set; }
}
