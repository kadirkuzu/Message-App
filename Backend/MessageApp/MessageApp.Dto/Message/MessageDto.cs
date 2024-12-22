namespace MessageApp.Dto.Message; 

public class MessageDto
{
    public Guid SenderId { get; set; }
    public Guid ChatId { get; set; }
    public string Content { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreatedDate { get; set; }
}
