using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Dto.Message;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Concrete.Signalr;

namespace MessageApp.Commands.Messages.AddMessage; 

public record AddMessageCommand(Guid ChatId, string Content) : IRequest<MessageDto>;
public class AddMessageCommandHandler : IRequestHandler<AddMessageCommand, MessageDto>
{
    readonly IReadRepository<Chat> _chatReadRepository;
    readonly IWriteRepository<Chat> _chatWriteRepository;
    readonly IWriteRepository<Message> _writeRepository;
    readonly User _user;
    readonly IMapper _mapper;
    readonly IMessageHubService _messageHub;

    public AddMessageCommandHandler(IReadRepository<Chat> chatReadRepository, IWriteRepository<Chat> chatWriteRepository, IWriteRepository<Message> writeRepository, User user, IMessageHubService messageHub)
    {
        _chatReadRepository = chatReadRepository;
        _chatWriteRepository = chatWriteRepository;
        _writeRepository = writeRepository;
        _user = user;
        _messageHub = messageHub;
    }

    public async Task<MessageDto> Handle(AddMessageCommand request, CancellationToken cancellationToken)
    {
        var message = new Message(_user.Id,request.ChatId,request.Content);
        await _writeRepository.AddAsync(message);

        var chat = await _chatReadRepository.GetFirstAsync(x=>x.Id == request.ChatId);
        chat.AddMessage(message);

        var mapped = _mapper.Map<MessageDto>(message);

        var notification = new SignalRNotificationDto
        {
            Object = mapped
        };

        await _messageHub.SendToGroup(request.ChatId.ToString(), SignalRTarget.MessageAdded, notification);

        await _chatWriteRepository.SaveAsync();
        await _writeRepository.SaveAsync();

        return mapped;

    }
}
