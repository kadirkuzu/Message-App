using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Chat;
using MessageApp.Dto.Common;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Concrete.Signalr;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
namespace MessageApp.Services.Concrete;
public class ChatService : IChatService
{
    readonly IWriteRepository<Chat> _writeRepository;
    readonly IWriteRepository<Message> _messageWriteRepository;
    readonly UserManager<User> _userManager;
    readonly IMapper _mapper;
    readonly IConfiguration _configuration;
    readonly IMessageHubService _messageHubService;
    readonly User _user;

    public ChatService(IWriteRepository<Chat> writeRepository, IWriteRepository<Message> messageWriteRepository, UserManager<User> userManager, IMapper mapper, IMessageHubService messageHubService, User user, IConfiguration configuration)
    {
        _writeRepository = writeRepository;
        _messageWriteRepository = messageWriteRepository;
        _userManager = userManager;
        _mapper = mapper;
        _messageHubService = messageHubService;
        _user = user;
        _configuration = configuration;
    }

    public async Task<ChatDto> CreateChat(IEnumerable<Guid> UserIds, string Title,string FirstMessage, CancellationToken cancellationToken = default)
    {
        var users = await _userManager.Users.Where(user => UserIds.Any(x => x == user.Id || _user.Id == user.Id)).ToListAsync(cancellationToken);
        var chat = new Chat(users, users.Count > 2, Title);
        await _writeRepository.AddAsync(chat);

        var message = new Message(_user, chat.Id, FirstMessage);
        await _messageWriteRepository.AddAsync(message);
        await _messageWriteRepository.SaveAsync();
        chat.AddMessage(message);
        var mapped = _mapper.Map<ChatDto>(chat);

        var chatNotification = new SignalRNotificationDto
        {
            Object = mapped
        };

        await _writeRepository.AddAsync(chat);
        await _messageHubService.SendToUsers(users.Select(x => x.Id), SignalRTarget.ChatAdded, chatNotification);

        return mapped;
    }

    public async Task<ChatDto> CreateChatWithAdmin(Guid UserId, CancellationToken cancellationToken = default)
    {
        var userName = _configuration["App:AdminUserName"];
        var admin = await _userManager.FindByNameAsync(userName!);
        return await CreateChat([UserId,admin!.Id],"","Welcome To Message App",cancellationToken);
    }
}
