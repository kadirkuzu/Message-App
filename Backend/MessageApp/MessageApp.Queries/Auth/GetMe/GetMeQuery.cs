using MessageApp.Domain.Entities;
using MessageApp.Dto.User;
using Microsoft.AspNetCore.Identity;

namespace MessageApp.Queries.Auth.GetMe; 

public record GetMeQuery () : IRequest<UserDto>;

public class GetMeQueryHandler : IRequestHandler<GetMeQuery, UserDto>
{
    readonly User _user;
    readonly UserManager<User> _userManager;

    public GetMeQueryHandler(User user, UserManager<User> userManager)
    {
        _user = user;
        _userManager = userManager;
    }

    public async Task<UserDto> Handle(GetMeQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(_user.Id.ToString());

        return (new UserDto {
            Id = user!.Id,
            Email = user.Email!,
            FullName = user.FullName,
            PhoneNumber = user.PhoneNumber!,
            UserName = user.UserName!,
            HasPhoto = user.HasPhoto!,
        });
    }
}
