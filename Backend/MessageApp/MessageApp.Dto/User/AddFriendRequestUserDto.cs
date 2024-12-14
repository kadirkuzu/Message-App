namespace MessageApp.Dto.User; 

public class AddFriendRequestUserDto
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public bool IsSended { get; set; }
    public bool IsFriend { get; set; }
    public bool HasPhoto { get; set; }

}
