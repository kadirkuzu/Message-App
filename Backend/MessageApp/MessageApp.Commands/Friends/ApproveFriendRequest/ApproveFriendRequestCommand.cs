
using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Chat;
using MessageApp.Dto.Common;
using MessageApp.Dto.Friend;
using MessageApp.Dto.User;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Concrete.Signalr;
using Microsoft.AspNetCore.Identity;
using System;

namespace MessageApp.Commands.Friends.ApproveFriendRequest;

public record ApproveFriendRequestCommand(Guid FriendRequestId, Guid SenderId) : IRequest<FriendDto>;

public class ApproveFriendRequestCommandHandler : IRequestHandler<ApproveFriendRequestCommand, FriendDto>
{
    readonly IReadRepository<FriendRequest> _readRepository;
    readonly IWriteRepository<FriendRequest> _writeRepository;
    readonly IReadRepository<Chat> _chatReadRepository;
    readonly IWriteRepository<Chat> _chatWriteRepository;
    readonly UserManager<User> _userManager;
    readonly User _user;
    readonly IMessageHubService _messageHubService;
    readonly IMapper _mapper;

    public ApproveFriendRequestCommandHandler(IReadRepository<FriendRequest> readRepository, IWriteRepository<FriendRequest> writeRepository, User user, UserManager<User> userManager, IMessageHubService messageHubService, IReadRepository<Chat> chatReadRepository, IWriteRepository<Chat> chatWriteRepository, IMapper mapper)
    {
        _readRepository = readRepository;
        _writeRepository = writeRepository;
        _user = user;
        _userManager = userManager;
        _messageHubService = messageHubService;
        _chatReadRepository = chatReadRepository;
        _chatWriteRepository = chatWriteRepository;
        _mapper = mapper;
    }

    public async Task<FriendDto> Handle(ApproveFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var friendRequest = await _readRepository.GetFirstAsync(x => 
            x.Id == request.FriendRequestId && x.SenderId == request.SenderId && x.ReceiverId == _user.Id && !x.IsAccepted) ?? throw new Exception("Friend Request Not Found");

        friendRequest.Accept();

        var chat = await _chatReadRepository.GetFirstAsync(x => !x.IsGroup && x.Users.Any(user => user.Id == _user.Id) && x.Users.Any(user => user.Id == request.SenderId));

        var sender = await _userManager.FindByIdAsync(friendRequest.SenderId.ToString());
        var receiver = await _userManager.FindByIdAsync(friendRequest.ReceiverId.ToString());

        if (chat == null) {
            chat = new Chat([sender,receiver],false);
            await _chatWriteRepository.AddAsync(chat);
            await _chatWriteRepository.SaveAsync();

            var chatNotification = new SignalRNotificationDto
            {
                Object = _mapper.Map<ChatDto>(chat)
            };

            await _messageHubService.SendToUsers([friendRequest.SenderId,friendRequest.ReceiverId], SignalRTarget.ChatAdded, chatNotification);
        }

        await _writeRepository.SaveAsync();

        var friendDto = _mapper.Map<FriendDto>(_user);
        friendDto.AcceptedDate = DateTime.UtcNow;
        friendDto.FriendRequestId = friendRequest.Id;
        friendDto.UserId = _user.Id;

        var notification = new SignalRNotificationDto
        {
            Object = friendDto
        };

        friendDto = _mapper.Map<FriendDto>(sender);
        friendDto.AcceptedDate = DateTime.UtcNow;
        friendDto.FriendRequestId = friendRequest.Id;
        friendDto.UserId = sender!.Id;

        await _messageHubService.SendToUser(friendRequest.SenderId,SignalRTarget.FriendAdded,notification);

        return friendDto;
    }
}