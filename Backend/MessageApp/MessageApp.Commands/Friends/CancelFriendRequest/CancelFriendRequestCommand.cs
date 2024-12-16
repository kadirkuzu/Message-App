using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Concrete.Signalr;

namespace MessageApp.Commands.Friends.CancelFriendRequest;

public record CancelFriendRequestCommand(Guid ReceiverId) : IRequest<BoolDto>;

public class CancelFriendRequestCommandHandler : IRequestHandler<CancelFriendRequestCommand, BoolDto>
{
    readonly IWriteRepository<FriendRequest> _writeRepository;
    readonly IReadRepository<FriendRequest> _readRepository;
    readonly User _user;
    readonly IMessageHubService _messageHub;

    public CancelFriendRequestCommandHandler(IWriteRepository<FriendRequest> writeRepository, IReadRepository<FriendRequest> readRepository, User user, IMessageHubService messageHub)
    {
        _writeRepository = writeRepository;
        _readRepository = readRepository;
        _user = user;
        _messageHub = messageHub;
    }

    public async Task<BoolDto> Handle(CancelFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var friendRequest = await _readRepository.GetFirstAsync(x => 
                            x.SenderId == _user.Id &&
                            x.ReceiverId == request.ReceiverId &&
                            !x.IsAccepted) ?? throw new Exception("Friend Request Not Found");

        var result = _writeRepository.Remove(friendRequest);
        await _writeRepository.SaveAsync();

        var notification = new SignalRNotificationDto
        {
            Object = new IdDto
            {
                Id = friendRequest.Id,
            }
        };

        await _messageHub.SendToUser(request.ReceiverId, SignalRTarget.FriendRequestRemoved, notification);

        return new BoolDto { Result = result };
    }
}
