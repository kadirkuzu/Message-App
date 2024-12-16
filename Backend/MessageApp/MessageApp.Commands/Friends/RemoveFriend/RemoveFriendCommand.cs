using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Concrete.Signalr;

namespace MessageApp.Commands.Friends.RemoveFriend; 

public record RemoveFriendCommand(Guid FriendRequestId): IRequest<IdDto>;

public class RemoveFriendCommandHandler : IRequestHandler<RemoveFriendCommand, IdDto>
{
    readonly IReadRepository<FriendRequest> _readRepository;
    readonly IWriteRepository<FriendRequest> _writeRepository;
    readonly IMessageHubService _messageHubService;
    readonly User _user;

    public RemoveFriendCommandHandler(IReadRepository<FriendRequest> readRepository, IWriteRepository<FriendRequest> writeRepository, IMessageHubService messageHubService, User user)
    {
        _readRepository = readRepository;
        _writeRepository = writeRepository;
        _messageHubService = messageHubService;
        _user = user;
    }

    public async Task<IdDto> Handle(RemoveFriendCommand request, CancellationToken cancellationToken)
    {
        var friendRequest = await _readRepository.GetFirstAsync(x => x.Id == request.FriendRequestId) ?? throw new Exception("Friend Not Found") ;

        _writeRepository.Remove(friendRequest);
        await _writeRepository.SaveAsync();

        var id = _user.Id == friendRequest.SenderId ? friendRequest.ReceiverId : friendRequest.SenderId ;

        var notification = new SignalRNotificationDto
        {
            Object = new IdDto
            {
                Id = friendRequest.Id,
            }
        };

        await _messageHubService.SendToUser(id,SignalRTarget.FriendRemoved, notification);


        return new IdDto { Id = friendRequest.Id };
    }
}
