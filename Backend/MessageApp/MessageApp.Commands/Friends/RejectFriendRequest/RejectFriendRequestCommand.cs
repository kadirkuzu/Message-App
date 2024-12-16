using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;

namespace MessageApp.Commands.Friends.RejectFriendRequest;

public record RejectFriendRequestCommand(Guid FriendRequestId, Guid SenderId) : IRequest<IdDto>;

public class RejectFriendRequestCommandHandler : IRequestHandler<RejectFriendRequestCommand, IdDto>
{
    readonly IWriteRepository<FriendRequest> _writeRepository;
    readonly IReadRepository<FriendRequest> _readRepository;
    readonly User _user;

    public RejectFriendRequestCommandHandler(IWriteRepository<FriendRequest> writeRepository, IReadRepository<FriendRequest> readRepository, User user, IMessageHubService messageHub)
    {
        _writeRepository = writeRepository;
        _readRepository = readRepository;
        _user = user;
    }

    public async Task<IdDto> Handle(RejectFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var friendRequest = await _readRepository.GetFirstAsync(x =>
                            x.SenderId == request.SenderId &&
                            x.ReceiverId == _user.Id &&
                            x.Id == request.FriendRequestId &&
                            !x.IsAccepted) ?? throw new Exception("Friend Request Not Found");

        var result = _writeRepository.Remove(friendRequest);
        await _writeRepository.SaveAsync();

        return new IdDto { Id = friendRequest.Id };
    }
}
