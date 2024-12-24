using MessageApp.Dto.Message;

namespace MessageApp.Services.Abstract; 

public interface IMessageService
{
    Task<MessageDto> SendMessage(Guid ChatId, string Content);
    Task SendMessageToAll(string Content);
}
