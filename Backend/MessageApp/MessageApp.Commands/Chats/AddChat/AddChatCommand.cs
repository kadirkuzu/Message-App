using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Chat;
using MessageApp.Dto.Common;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Concrete.Signalr;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Commands.Chats.AddChat; 

public record AddChatCommand(IEnumerable<Guid> UserIds, string Title): IRequest<ChatDto>;
public class AddChatCommandHandler : IRequestHandler<AddChatCommand, ChatDto>
{
    readonly IWriteRepository<Chat> _writeRepository;
    readonly IWriteRepository<Message> _messageWriteRepository;
    readonly UserManager<User> _userManager;
    readonly IMapper _mapper;
    readonly IMessageHubService _messageHubService;
    readonly User _user;
    public AddChatCommandHandler(IWriteRepository<Chat> writeRepository, UserManager<User> userManager, IMapper mapper, IMessageHubService messageHubService, IWriteRepository<Message> messageWriteRepository, User user)
    {
        _writeRepository = writeRepository;
        _userManager = userManager;
        _mapper = mapper;
        _messageHubService = messageHubService;
        _messageWriteRepository = messageWriteRepository;
        _user = user;
    }

    public async Task<ChatDto> Handle(AddChatCommand request, CancellationToken cancellationToken)
    {
        var users = await _userManager.Users.Where(user => request.UserIds.Any(x => x == user.Id || _user.Id == user.Id)).ToListAsync(cancellationToken);
        var chat = new Chat(users,true,request.Title);
        await _writeRepository.AddAsync(chat);

        var message = new Message(_user,chat.Id,"Group Created");
        await _messageWriteRepository.AddAsync(message);
        await _messageWriteRepository.SaveAsync();

        chat.AddMessage(message);

        var mapped = _mapper.Map<ChatDto>(chat);

        var chatNotification = new SignalRNotificationDto
        {
            Object = mapped
        };

        await _writeRepository.AddAsync(chat);
        await _messageHubService.SendToUsers(users.Select(x=>x.Id), SignalRTarget.ChatAdded, chatNotification);

        return mapped;
    }
}
