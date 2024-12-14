using MessageApp.Domain.Entities;
using MessageApp.Dto.User;

namespace MessageApp.Queries.Auth.GetMe; 

public record GetMeQuery () : IRequest<UserDto>;

public class GetMeQueryHandler : IRequestHandler<GetMeQuery, UserDto>
{
    readonly User _user;

    public GetMeQueryHandler(User user)
    {
        _user = user;
    }

    public Task<UserDto> Handle(GetMeQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(new UserDto { Email = _user.Email, FullName = _user.FullName, PhoneNumber = _user.PhoneNumber, UserName = _user.UserName, Id = _user.Id });
    }
}
