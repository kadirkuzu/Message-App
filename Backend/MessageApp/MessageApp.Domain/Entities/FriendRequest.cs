using MessageApp.Domain.Entities.Common;

namespace MessageApp.Domain.Entities;
public class FriendRequest : BaseEntity
{
    public Guid SenderId { get; set; }
    public Guid ReceiverId { get; set; }
    public bool IsAccepted { get; set; }
    public DateTime? AcceptedDate { get; set; }
    public User Sender { get; set; }
    public User Receiver { get; set; }

    public FriendRequest(Guid senderId, Guid receiverId, bool isAccepted = false)
    {
        SenderId = senderId;
        ReceiverId = receiverId;
        IsAccepted = isAccepted;
    }

    public void Accept()
    {
        IsAccepted = true;
        AcceptedDate = DateTime.UtcNow;
    }
}
