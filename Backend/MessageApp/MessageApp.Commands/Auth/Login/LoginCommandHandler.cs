using MessageApp.Domain.Entities;
using MessageApp.Dto.User;
using MessageApp.Services.Abstract;
using Microsoft.AspNetCore.Identity;

namespace MessageApp.Commands.Auth.Login;

public record LoginCommand(string EmailOrUserName, string Password): IRequest<UserToken>;

public class LoginCommandHandler : IRequestHandler<LoginCommand, UserToken>
{
    readonly UserManager<User> _userManager;
    readonly SignInManager<User> _signInManager;
    readonly ITokenService _tokenHandler;

    public LoginCommandHandler(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenHandler)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenHandler = tokenHandler;
    }

    public async Task<UserToken> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.EmailOrUserName);
        user ??= await _userManager.FindByEmailAsync(request.EmailOrUserName) ?? throw new Exception("User Not Found"); 
        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (result.Succeeded) {
            UserToken token = await _tokenHandler.CreateAccessToken(user);
            user.RefreshToken = token.RefreshToken;
            user.RefreshTokenEndDate = token.Expiration.AddHours(1);
            await _userManager.UpdateAsync(user);
            return token;
        }
        else
        {
            throw new Exception("Email or password is not correct");
        }
    }
}
