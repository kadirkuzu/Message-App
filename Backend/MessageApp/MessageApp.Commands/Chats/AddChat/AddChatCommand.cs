using MessageApp.Domain.Entities;
using MessageApp.Dto.Chat;
using MessageApp.Dto.Common;
using MessageApp.Services.Abstract;
using MessageApp.Services.Concrete.Signalr;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Commands.Chats.AddChat; 

public record AddChatCommand(IEnumerable<Guid> UserIds, string Title): IRequest<ChatDto>;
public class AddChatCommandHandler : IRequestHandler<AddChatCommand, ChatDto>
{
    readonly IChatService _chatService;

    public AddChatCommandHandler(IChatService chatService)
    {
        _chatService = chatService;
    }

    public async Task<ChatDto> Handle(AddChatCommand request, CancellationToken cancellationToken)
    {
        return await _chatService.CreateChat(request.UserIds, request.Title, "Group Created.", cancellationToken);
    }
}
