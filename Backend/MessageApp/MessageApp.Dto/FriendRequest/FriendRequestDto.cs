namespace MessageApp.Dto.FriendRequest; 

public class FriendRequestDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime CreatedDate { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public bool HasPhoto { get; set; }
}
