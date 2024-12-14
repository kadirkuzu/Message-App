
using MediatR;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Dto.Friend;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Concrete.Signalr;
using Microsoft.AspNetCore.Identity;

namespace MessageApp.Commands.Friends.ApproveFriendRequest;

public record ApproveFriendRequestCommand(Guid FriendRequestId, Guid SenderId) : IRequest<FriendDto>;

public class ApproveFriendRequestCommandHandler : IRequestHandler<ApproveFriendRequestCommand, FriendDto>
{
    readonly IReadRepository<FriendRequest> _readRepository;
    readonly IWriteRepository<FriendRequest> _writeRepository;
    readonly UserManager<User> _userManager;
    readonly User _user;
    readonly IMessageHubService _messageHubService;

    public ApproveFriendRequestCommandHandler(IReadRepository<FriendRequest> readRepository, IWriteRepository<FriendRequest> writeRepository, User user, UserManager<User> userManager, IMessageHubService messageHubService)
    {
        _readRepository = readRepository;
        _writeRepository = writeRepository;
        _user = user;
        _userManager = userManager;
        _messageHubService = messageHubService;
    }

    public async Task<FriendDto> Handle(ApproveFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var friendRequest = await _readRepository.GetFirstAsync(x => 
            x.Id == request.FriendRequestId && x.SenderId == request.SenderId && x.ReceiverId == _user.Id && !x.IsAccepted) ?? throw new Exception("Friend Request Not Found");

        friendRequest.Accept();

        await _writeRepository.SaveAsync();

        var notification = new SignalRNotificationDto
        {
            Object = new FriendDto
            {
                AcceptedDate = DateTime.UtcNow,
                Email = _user.Email!,
                FullName = _user.FullName!,
                PhoneNumber = _user.PhoneNumber!,
                UserId = _user.Id,
                UserName = _user.UserName!
            }
        };

        await _messageHubService.SendToUser(friendRequest.SenderId,SignalRTarget.FriendAdded,notification);

        var sender = await _userManager.FindByIdAsync(friendRequest.SenderId.ToString());

        return new FriendDto
        {
            AcceptedDate = DateTime.UtcNow,
            Email = sender?.Email!,
            FullName = sender?.FullName!,
            PhoneNumber = sender?.PhoneNumber!,
            UserId = friendRequest.SenderId,
            UserName = sender?.UserName!
        };
    }
}