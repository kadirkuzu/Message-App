using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Repository.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Abstract.Storage;
using MessageApp.Services.Concrete.Signalr;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Commands.Chats.UploadImage;
public record UploadGroupImageCommand(Guid ChatId, IFormFileCollection Files) : IRequest<BoolDto>;

public record UploadGroupImageCommandHandler : IRequestHandler<UploadGroupImageCommand, BoolDto>
{
    readonly IStorageService _storageService;
    readonly IReadRepository<Chat> _readRepository;
    readonly IWriteRepository<Chat> _writeRepository;
    readonly IMessageHubService _messageHubService;

    public UploadGroupImageCommandHandler(IStorageService storageService, IReadRepository<Chat> readRepository, IWriteRepository<Chat> writeRepository, IMessageHubService messageHubService)
    {
        _storageService = storageService;
        _readRepository = readRepository;
        _writeRepository = writeRepository;
        _messageHubService = messageHubService;
    }

    public async Task<BoolDto> Handle(UploadGroupImageCommand request, CancellationToken cancellationToken)
    {
        var photos = await _storageService.UploadAsync("group-images", request.Files) ?? throw new Exception("Something went wrong");

        var chat = await _readRepository.GetWhere(x=>x.Id == request.ChatId).Include(x=>x.Users).FirstAsync();

        chat!.HasImage = photos.Any();
        _writeRepository.Update(chat);

        await _writeRepository.SaveAsync();

        var notification = new SignalRNotificationDto
        {
            Object = new IdDto { Id = chat.Id }
        };
        await _messageHubService.SendToUsers(chat.Users.Select(x=>x.Id), SignalRTarget.ChatPhotoUploaded, notification);

        return new BoolDto { Result = photos.Any() };
    }
}
