using MessageApp.Domain.Entities;
using MessageApp.Dto.User;
using MessageApp.Services.Abstract;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Commands.Auth.RefreshToken;
public record RefreshTokenCommand(string RefreshToken) : IRequest<UserToken>;
public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, UserToken>
{
    readonly UserManager<User> _userManager;
    readonly ITokenHandler _tokenHandler;

    public RefreshTokenCommandHandler(UserManager<User> userManager, ITokenHandler tokenHandler)
    {
        _userManager = userManager;
        _tokenHandler = tokenHandler;
    }

    public async Task<UserToken> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(x =>x.RefreshToken == request.RefreshToken, cancellationToken);
        if (user == null || user.RefreshTokenEndDate < DateTime.UtcNow) throw new Exception("Bad Token");
        else
        {
            var token = _tokenHandler.CreateAccessToken();
            user.RefreshToken = token.RefreshToken;
            user.RefreshTokenEndDate = token.Expiration.AddHours(1);
            return token;
        }
    }
}
