using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Services.Abstract.Storage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Commands.Users.UploadImage;
public record UploadImageCommand(IFormFileCollection Files) : IRequest<BoolDto>;

public record UploadImageCommandHandler : IRequestHandler<UploadImageCommand, BoolDto>
{
    readonly IStorageService _storageService;
    readonly UserManager<User> _userManager;
    readonly User _user;

    public UploadImageCommandHandler(IStorageService storageService, UserManager<User> userManager, User user)
    {
        _storageService = storageService;
        _userManager = userManager;
        _user = user;
    }

    public async Task<BoolDto> Handle(UploadImageCommand request, CancellationToken cancellationToken)
    {
        var photos = await _storageService.UploadAsync("profile-images", request.Files) ?? throw new Exception("Something went wrong");

        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == _user.Id, cancellationToken);

        user!.HasPhoto = photos.Any();

        await _userManager.UpdateAsync(user);

        return new BoolDto { Result = photos.Any() };
    }
}
