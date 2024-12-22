using MessageApp.Dto.Message;
using MessageApp.Dto.User;

namespace MessageApp.Dto.Chat;

public class ChatDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public MessageDto? LastMessage { get; set; }
    public bool IsGroup { get; set; }
    public bool HasImage { get; set; }
    public int UnreadCount { get; set; }
    public DateTime CreatedDate { get; set; }
    public IEnumerable<UserDto> Users { get; set; }
}
