﻿using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.User;
using Microsoft.AspNetCore.Identity;

namespace MessageApp.Commands.Users.UpdateUser; 
public record UpdateUserCommand(string UserName, string Email, string FullName, string PhoneNumber):IRequest<UserDto>;
public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, UserDto>
{
    readonly UserManager<User> _userManager;
    readonly User _user;
    readonly IMapper _mapper;

    public UpdateUserCommandHandler(UserManager<User> userManager, User user, IMapper mapper)
    {
        _userManager = userManager;
        _user = user;
        _mapper = mapper;
    }

    public async Task<UserDto> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(_user.Id.ToString());
        user!.UserName = request.UserName;
        user.Email = request.Email;
        user.FullName = request.FullName;
        user.PhoneNumber = request.PhoneNumber;

        await _userManager.UpdateAsync(user);

        return _mapper.Map<UserDto>(user);

    }
}