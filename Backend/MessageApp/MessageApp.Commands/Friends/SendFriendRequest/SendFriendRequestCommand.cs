using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Dto.FriendRequest;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Concrete.Signalr;

namespace MessageApp.Commands.Friends.SendFriendRequest; 

public record SendFriendRequestCommand(Guid ReceiverId) : IRequest<BoolDto>;

public class SendFriendRequestCommandHandler : IRequestHandler<SendFriendRequestCommand, BoolDto>
{
    readonly IWriteRepository<FriendRequest> _writeRepository;
    readonly IReadRepository<FriendRequest> _readRepository;
    readonly User _user;
    readonly IMessageHubService _messageHub;

    public SendFriendRequestCommandHandler(IWriteRepository<FriendRequest> writeRepository, IReadRepository<FriendRequest> readRepository, User user, IMessageHubService messageHub)
    {
        _writeRepository = writeRepository;
        _readRepository = readRepository;
        _user = user;
        _messageHub = messageHub;
    }

    public async Task<BoolDto> Handle(SendFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var friendRequest = await _readRepository.GetFirstAsync(x =>
            (x.SenderId == _user.Id || x.SenderId == request.ReceiverId) && (x.ReceiverId == _user.Id || x.ReceiverId == request.ReceiverId));

        if (friendRequest != null) throw new Exception("Friend Request Already Exists");

        var newFriendRequest = new FriendRequest(_user.Id, request.ReceiverId);
        var result = await _writeRepository.AddAsync(newFriendRequest);
        await _writeRepository.SaveAsync();

        var notification = new SignalRNotificationDto {
            Object = new FriendRequestDto
            {
                Id = newFriendRequest.Id,
                CreatedDate = DateTime.UtcNow,
                UserId = _user.Id,
                FullName = _user.FullName,
                UserName = _user.UserName!,
            }
        };

        await _messageHub.SendToUser(request.ReceiverId, SignalRTarget.FriendRequestAdded, notification);

        return new BoolDto { Result = result };

    }
}
