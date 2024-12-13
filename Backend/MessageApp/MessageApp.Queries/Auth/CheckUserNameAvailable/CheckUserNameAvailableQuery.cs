using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using Microsoft.AspNetCore.Identity;

namespace MessageApp.Queries.Auth.CheckUserNameAvailable;

public record CheckUserNameAvailableQuery(string UserName) : IRequest<BoolDto>;

public class CheckUserNameAvailableQueryHandler : IRequestHandler<CheckUserNameAvailableQuery, BoolDto>
{
    UserManager<User> _userManager;

    public CheckUserNameAvailableQueryHandler(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<BoolDto> Handle(CheckUserNameAvailableQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.UserName);
        return new BoolDto { Result = user == null };
    }
}
