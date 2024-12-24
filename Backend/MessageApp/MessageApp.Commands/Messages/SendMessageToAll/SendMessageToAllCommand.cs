
using MessageApp.Services.Abstract;

namespace MessageApp.Commands.Messages.SendMessageToAll;

public record SendMessageToAllCommand(string Content) : IRequest;

public class SendMessageToAllCommandHandler : IRequestHandler<SendMessageToAllCommand>
{
    readonly IMessageService _messageService;

    public SendMessageToAllCommandHandler(IMessageService messageService)
    {
        _messageService = messageService;
    }

    public async Task Handle(SendMessageToAllCommand request, CancellationToken cancellationToken)
    {
        await _messageService.SendMessageToAll(request.Content);
    }
}
