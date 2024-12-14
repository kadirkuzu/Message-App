using MessageApp.Domain.Entities;
using MessageApp.Dto.FriendRequest;
using MessageApp.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Queries.Friends.GetFriendRequests; 

public record GetFriendRequestsQuery() :IRequest<IEnumerable<FriendRequestDto>> ;

public class GetFriendRequestsQueryHandler : IRequestHandler<GetFriendRequestsQuery, IEnumerable<FriendRequestDto>>
{
    readonly User _user;
    readonly IReadRepository<FriendRequest> _readRepository;
    public GetFriendRequestsQueryHandler(User user, IReadRepository<FriendRequest> readRepository)
    {
        _user = user;
        _readRepository = readRepository;
    }

    public async Task<IEnumerable<FriendRequestDto>> Handle(GetFriendRequestsQuery request, CancellationToken cancellationToken)
    {
        var requests = await _readRepository.GetWhere(x=>x.ReceiverId == _user.Id && x.IsAccepted == false )
                .Include(x=>x.Sender)
                .AsNoTracking()
                .OrderByDescending(x=>x.CreatedDate)
                .ToListAsync(cancellationToken);

        return requests.Select(x => new FriendRequestDto
        {
            Id = x.Id,
            CreatedDate = x.CreatedDate,
            FullName = x.Sender.FullName,
            UserId = x.SenderId,
            UserName = x.Sender.UserName!,
            HasPhoto = x.Sender.HasPhoto,
        });

    }
}