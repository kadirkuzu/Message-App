using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.User;
using Microsoft.AspNetCore.Identity;

namespace MessageApp.Queries.Auth.GetMe; 

public record GetMeQuery () : IRequest<UserDto>;

public class GetMeQueryHandler : IRequestHandler<GetMeQuery, UserDto>
{
    readonly User _user;
    readonly UserManager<User> _userManager;
    readonly IMapper _mapper;

    public GetMeQueryHandler(User user, UserManager<User> userManager, IMapper mapper)
    {
        _user = user;
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<UserDto> Handle(GetMeQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(_user.Id.ToString());
        var roles = await _userManager.GetRolesAsync(user!);
        var mapped = _mapper.Map<UserDto>(user);
        mapped.Roles = roles;

        return mapped;
    }
}
