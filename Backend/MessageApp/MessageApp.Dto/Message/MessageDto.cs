using MessageApp.Dto.User;

namespace MessageApp.Dto.Message; 

public class MessageDto
{
    public Guid Id { get; set; }
    public UserDto Sender { get; set; }
    public Guid ChatId { get; set; }
    public string Content { get; set; }
    public bool IsRead { get; set; }
    public bool IsEncrypted { get; set; }
    public DateTime CreatedDate { get; set; }
}
