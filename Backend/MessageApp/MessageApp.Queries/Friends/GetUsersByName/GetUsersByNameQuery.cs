using MessageApp.Domain.Entities;
using MessageApp.Dto.User;
using MessageApp.Repository.Abstract;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Queries.Friends.GetUsersByName; 

public record GetUsersByNameQuery (string UserName): IRequest<IEnumerable<AddFriendRequestUserDto>>;

public class GetUsersByNameQueryHandler : IRequestHandler<GetUsersByNameQuery, IEnumerable<AddFriendRequestUserDto>>
{
    readonly UserManager<User> _userManager;
    readonly IReadRepository<FriendRequest> _readFriendRequests;
    readonly User _user;

    public GetUsersByNameQueryHandler(UserManager<User> userManager, User user, IReadRepository<FriendRequest> readFriendRequests)
    {
        _userManager = userManager;
        _user = user;
        _readFriendRequests = readFriendRequests;
    }

    public async Task<IEnumerable<AddFriendRequestUserDto>> Handle(GetUsersByNameQuery request, CancellationToken cancellationToken)
    {
        var users = await _userManager.Users
            .Where(x=>x.Id != _user.Id)
            .Where(x => x.UserName!.Contains(request.UserName) || x.FullName.Contains(request.UserName))
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var friendRequests = await _readFriendRequests.GetWhere(x => x.SenderId == _user.Id || x.ReceiverId == _user.Id).ToListAsync(cancellationToken); 

        return users.Select(x =>
        {
            var friendRequest = friendRequests.FirstOrDefault(x=>x.SenderId == _user.Id || x.ReceiverId == _user.Id);

            return new AddFriendRequestUserDto
            {
                FullName = x.FullName,
                UserName = x.UserName!,
                Id = x.Id,
                IsFriend = friendRequest?.IsAccepted ?? false,
                IsSended = friendRequest != null,
            };
        });
    }
}