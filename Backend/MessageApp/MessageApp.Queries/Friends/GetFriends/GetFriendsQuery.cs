using MessageApp.Domain.Entities;
using MessageApp.Dto.Friend;
using MessageApp.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Queries.Friends.GetFriends; 

public record GetFriendsQuery():IRequest<IEnumerable<FriendDto>>;

public class GetFriendsQueryHandler : IRequestHandler<GetFriendsQuery, IEnumerable<FriendDto>>
{

    readonly IReadRepository<FriendRequest> _readRepository;
    readonly User _user;

    public GetFriendsQueryHandler(IReadRepository<FriendRequest> readRepository, User user)
    {
        _readRepository = readRepository;
        _user = user;
    }

    public async Task<IEnumerable<FriendDto>> Handle(GetFriendsQuery request, CancellationToken cancellationToken)
    {
        var list = await _readRepository.GetWhere(x => x.IsAccepted && x.SenderId == _user.Id || x.ReceiverId == _user.Id)
                        .AsNoTracking()
                        .OrderByDescending(x => x.AcceptedDate)
                        .Include(x => x.Sender)
                        .ToListAsync(cancellationToken);

        return list.Select(x => new FriendDto
        {
            AcceptedDate = x.AcceptedDate ?? DateTime.UtcNow,
            Email = x.Sender.Email!,
            FullName = x.Sender.FullName,
            PhoneNumber = x.Sender.PhoneNumber!,
            UserId = x.Sender.Id,
            UserName = x.Sender.UserName!
        });
    }
}