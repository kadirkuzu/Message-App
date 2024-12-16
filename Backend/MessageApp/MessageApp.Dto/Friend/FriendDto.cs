namespace MessageApp.Dto.Friend;

public class FriendDto
{
    public Guid FriendRequestId { get; set; }
    public Guid UserId { get; set; }
    public DateTime AcceptedDate { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public bool HasPhoto { get; set; }
}
