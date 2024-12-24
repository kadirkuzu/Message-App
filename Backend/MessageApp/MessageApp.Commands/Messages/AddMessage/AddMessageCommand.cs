using MessageApp.Dto.Message;
using MessageApp.Services.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;

namespace MessageApp.Commands.Messages.AddMessage; 

public record AddMessageCommand(Guid ChatId, string Content) : IRequest<MessageDto>;
public class AddMessageCommandHandler : IRequestHandler<AddMessageCommand, MessageDto>
{
    readonly IMessageService _messageService;

    public AddMessageCommandHandler(IMessageService messageService, IMessageHubService messageHubService)
    {
        _messageService = messageService;
    }

    public async Task<MessageDto> Handle(AddMessageCommand request, CancellationToken cancellationToken)
    {
        return await _messageService.SendMessage(request.ChatId,request.Content);   
    }
}
