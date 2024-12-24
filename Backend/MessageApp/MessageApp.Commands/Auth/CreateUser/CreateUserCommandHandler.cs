using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Services.Abstract;
using Microsoft.AspNetCore.Identity;

namespace MessageApp.Commands.Auth.CreateUser;

public record CreateUserCommand(string UserName, string Email, string FullName, string PhoneNumber, string Password) : IRequest<BoolDto>;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, BoolDto>
{
    readonly UserManager<User> _userManager;
    readonly IChatService _chatService;

    public CreateUserCommandHandler(UserManager<User> userManager, IChatService chatService)
    {
        _userManager = userManager;
        _chatService = chatService;
    }

    public async Task<BoolDto> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new User(request.Email, request.UserName, request.FullName, request.PhoneNumber);
        var result = await _userManager.CreateAsync(user, request.Password);
        if (result.Succeeded)
        {
            await _chatService.CreateChatWithAdmin(user.Id,cancellationToken);
            return new BoolDto { Result = true };
        }
        else
        {
            throw new Exception("An error occurred while creating the user.");
        }
    }
}
