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
        var searchValue = request.UserName.ToLower();
        var users = await _userManager.Users
            .Where(x=>x.Id != _user.Id)
            .Where(x => x.UserName!.ToLower().Contains(searchValue) || x.FullName.ToLower().Contains(searchValue))
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var friendRequests = await _readFriendRequests.GetWhere(x => x.SenderId == _user.Id || x.ReceiverId == _user.Id).ToListAsync(cancellationToken); 

        return users.Select(user =>
        {
            var friendRequest = friendRequests.FirstOrDefault(x=>x.SenderId == user.Id || x.ReceiverId == user.Id);

            return new AddFriendRequestUserDto
            {
                FullName = user.FullName,
                UserName = user.UserName!,
                Id = user.Id,
                IsFriend = friendRequest?.IsAccepted ?? false,
                IsSended = friendRequest?.SenderId == _user.Id,
                IsReceived = friendRequest?.ReceiverId == _user.Id,
                FriendRequestId = friendRequest?.Id,
                HasPhoto = user.HasPhoto
            };
        });
    }
}