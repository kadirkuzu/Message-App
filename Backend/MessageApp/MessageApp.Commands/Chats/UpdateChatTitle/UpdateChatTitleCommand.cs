using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Chat;
using MessageApp.Dto.Common;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Concrete.Signalr;

namespace MessageApp.Commands.Chats.UpdateChatTitle; 
public record UpdateChatTitleCommand(Guid ChatId,string Title): IRequest<ChatDto>;
public class UpdateChatTitleCommandHandler : IRequestHandler<UpdateChatTitleCommand, ChatDto>
{
    readonly IReadRepository<Chat> _readRepository;
    readonly IWriteRepository<Chat> _writeRepository;
    readonly IMapper _mapper;
    readonly IMessageHubService _messageHubService;

    public UpdateChatTitleCommandHandler(IReadRepository<Chat> readRepository, IWriteRepository<Chat> writeRepository, IMapper mapper, IMessageHubService messageHubService)
    {
        _readRepository = readRepository;
        _writeRepository = writeRepository;
        _mapper = mapper;
        _messageHubService = messageHubService;
    }

    public async Task<ChatDto> Handle(UpdateChatTitleCommand request, CancellationToken cancellationToken)
    {
        var chat = await _readRepository.GetByIdAsync(request.ChatId);
        chat.UpdateTitle(request.Title);

        await _writeRepository.SaveAsync();

        var mapped = _mapper.Map<ChatDto>(chat);

        var chatNotification = new SignalRNotificationDto
        {
            Object = mapped
        };

        await _writeRepository.AddAsync(chat);
        await _messageHubService.SendToGroup(chat.Id.ToString(), SignalRTarget.ChatTitleUpdated, chatNotification);

        return mapped;
    }
}
