namespace MessageApp.Dto.Common; 

public class SignalRNotificationDto
{
    public Guid SenderId { get; set; }
    public string SenderFullName { get; set; }
    public string SenderUserName { get; set; }
    public string SenderEmail { get; set; }
    public object Object { get; set; }

    public void SetUser (Domain.Entities.User user)
    {
        SenderId = user.Id;
        SenderFullName = user.FullName;
        SenderUserName = user.UserName;
        SenderEmail = user.Email;
    }
}
