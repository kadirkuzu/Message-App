namespace MessageApp.Domain.Entities; 
public class Group : Chat
{
    public ICollection<User> Admins { get; set; }
    public string Description { get; set; }
}
