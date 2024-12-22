using AutoMapper;
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
    readonly IMapper _mapper;

    public GetFriendsQueryHandler(IReadRepository<FriendRequest> readRepository, User user, IMapper mapper)
    {
        _readRepository = readRepository;
        _user = user;
        _mapper = mapper;
    }

    public async Task<IEnumerable<FriendDto>> Handle(GetFriendsQuery request, CancellationToken cancellationToken)
    {
        var list = await _readRepository.GetWhere(x => x.IsAccepted && (x.SenderId == _user.Id || x.ReceiverId == _user.Id))
                        .AsNoTracking()
                        .OrderByDescending(x => x.AcceptedDate)
                        .Include(x => x.Sender)
                        .Include(x=>x.Receiver)
                        .AsSplitQuery()
                        .ToListAsync(cancellationToken);

        return list.Select(x =>
        {
            var user = x.SenderId == _user.Id ? x.Receiver : x.Sender; 
            var dto = _mapper.Map<FriendDto>(user);

            dto.AcceptedDate = x.AcceptedDate ?? DateTime.UtcNow;
            dto.FriendRequestId = x.Id;
            dto.UserId = user.Id;
            return dto;
        });
    }
}