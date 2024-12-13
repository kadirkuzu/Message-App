namespace MessageApp.Dto.FriendRequest; 

public class FriendRequestDto
{
    public Guid UserId { get; set; }
    public DateTime CreatedDate { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
}
