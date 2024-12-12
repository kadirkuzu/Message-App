using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Dto.User;
using Microsoft.AspNetCore.Identity;

namespace MessageApp.Commands.Auth.CreateUser;

public record CreateUserCommand(string Email, string FullName, string PhoneNumber, string Password) : IRequest<BoolDto>;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, BoolDto>
{
    readonly UserManager<User> _userManager;

    public CreateUserCommandHandler(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<BoolDto> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new User {
            Id = Guid.NewGuid(),
            Email = request.Email,
            UserName = request.Email,
            FullName = request.FullName,
            PhoneNumber =request.PhoneNumber,
          };
        var result = await _userManager.CreateAsync(user,request.Password);
        if (result.Succeeded)
        {
            return new BoolDto { Result = true };
        }
        else
        {
            throw new Exception("An error occurred while creating the user.");
        }
    }
}
