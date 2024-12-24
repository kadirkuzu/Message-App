using AutoMapper;
using Azure.Core;
using MediatR;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Dto.Message;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Concrete.Signalr;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Services.Concrete;

public class MessageService : IMessageService
{
    readonly IReadRepository<Chat> _chatReadRepository;
    readonly IWriteRepository<Chat> _chatWriteRepository;
    readonly IWriteRepository<Message> _writeRepository;
    readonly User _user;
    readonly IMapper _mapper;
    readonly IMessageHubService _messageHub;

    public MessageService(IReadRepository<Chat> chatReadRepository, IWriteRepository<Chat> chatWriteRepository, IWriteRepository<Message> writeRepository, User user, IMapper mapper, IMessageHubService messageHub)
    {
        _chatReadRepository = chatReadRepository;
        _chatWriteRepository = chatWriteRepository;
        _writeRepository = writeRepository;
        _user = user;
        _mapper = mapper;
        _messageHub = messageHub;
    }

    public async Task<MessageDto> SendMessage(Guid ChatId, string Content)
    {
        var message = new Message(_user, ChatId, Content);
        await _writeRepository.AddAsync(message);

        var chat = await _chatReadRepository.GetFirstAsync(x => x.Id == ChatId);
        chat.AddMessage(message);

        var mapped = _mapper.Map<MessageDto>(message);

        var notification = new SignalRNotificationDto
        {
            Object = mapped
        };

        await _writeRepository.SaveAsync();

        await _messageHub.SendToGroup(ChatId.ToString(), SignalRTarget.MessageAdded, notification);

        return mapped;
    }

    public async Task SendMessageToAll(string Content)
    {
        var chats = await _chatReadRepository.GetWhere(x=> x.Users.Count == 2 && x.Users.Any(user => user.Id == _user.Id)).ToListAsync();
        foreach (var chat in chats)
        {
            var message = new Message(_user, chat.Id, Content, false);
            await _writeRepository.AddAsync(message);
            chat.AddMessage(message);
            var mapped = _mapper.Map<MessageDto>(message);
            var notification = new SignalRNotificationDto
            {
                Object = mapped
            };

            await _writeRepository.SaveAsync();
            await _messageHub.Send(SignalRTarget.MessageAdded, notification);

        }
    }
}
