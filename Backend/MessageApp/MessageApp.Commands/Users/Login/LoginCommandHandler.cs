using MessageApp.Domain.Entities;
using MessageApp.Dto.User;
using MessageApp.Services.Abstract.Token;
using Microsoft.AspNetCore.Identity;

namespace MessageApp.Commands.Users.Login; 

public record LoginCommand(string UserNameOrEmail, string Password): IRequest<UserToken>;

public class LoginCommandHandler : IRequestHandler<LoginCommand, UserToken>
{
    readonly UserManager<User> _userManager;
    readonly SignInManager<User> _signInManager;
    readonly ITokenHandler _tokenHandler;

    public LoginCommandHandler(UserManager<User> userManager, SignInManager<User> signInManager, ITokenHandler tokenHandler)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenHandler = tokenHandler;
    }

    public async Task<UserToken> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.UserNameOrEmail);
        user ??= await _userManager.FindByEmailAsync(request.UserNameOrEmail);
        if (user == null) throw new Exception("Email or password is not correct");

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (result.Succeeded) {
            return _tokenHandler.CreateAccessToken();
        }
        else
        {
            throw new Exception("Email or password is not correct");
        }
    }
}
