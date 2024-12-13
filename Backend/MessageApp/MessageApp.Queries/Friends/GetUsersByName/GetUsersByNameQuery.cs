using MessageApp.Domain.Entities;
using MessageApp.Dto.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Queries.Friends.GetUsersByName; 

public record GetUsersByNameQuery (string UserName): IRequest<IEnumerable<AddFriendRequestUserDto>>;

public class GetUsersByNameQueryHandler : IRequestHandler<GetUsersByNameQuery, IEnumerable<AddFriendRequestUserDto>>
{
    readonly UserManager<User> _userManager;

    public GetUsersByNameQueryHandler(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IEnumerable<AddFriendRequestUserDto>> Handle(GetUsersByNameQuery request, CancellationToken cancellationToken)
    {
        var users = await _userManager.Users.Where(x => x.UserName == request.UserName || x.FullName == request.UserName).ToListAsync(cancellationToken);

        return users.Select(x => new AddFriendRequestUserDto
        {
            FullName = x.FullName,
            UserName = x.UserName!,
            Id = x.Id,
        });
    }
}