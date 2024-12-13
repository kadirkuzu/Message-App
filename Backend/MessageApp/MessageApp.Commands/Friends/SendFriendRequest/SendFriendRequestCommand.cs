using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
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

        var result = await _writeRepository.AddAsync(new FriendRequest(_user.Id,request.ReceiverId));
        await _writeRepository.SaveAsync();

        await _messageHub.SendToUser(request.ReceiverId, SignalRTarget.MessageAdded, "Added");

        return new BoolDto { Result = result };

    }
}
