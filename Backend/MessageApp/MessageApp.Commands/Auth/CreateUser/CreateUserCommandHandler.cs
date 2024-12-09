using MessageApp.Domain.Entities;
using MessageApp.Dto.User;
using Microsoft.AspNetCore.Identity;

namespace MessageApp.Commands.Auth.CreateUser;

public record CreateUserCommand(string Email, string UserName, string FullName, string PhoneNumber, string Password) : IRequest<UserDto>;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, UserDto>
{
    readonly UserManager<User> _userManager;

    public CreateUserCommandHandler(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<UserDto> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new User {
            Id = new Guid(),
            Email = request.Email,
            UserName = request.UserName,
            FullName = request.FullName,
            PhoneNumber =request.PhoneNumber,
          };
        var result = await _userManager.CreateAsync(user,request.Password);
        if (result.Succeeded) {
            return new UserDto();
        }
        else
        {
            throw new Exception("An error occurred while creating the user.");
        }
    }
}
