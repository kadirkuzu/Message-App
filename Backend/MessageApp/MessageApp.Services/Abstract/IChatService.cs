using MessageApp.Domain.Entities;
using MessageApp.Dto.Chat;

namespace MessageApp.Services.Abstract;

public interface IChatService
{
    public Task<ChatDto> CreateChat(IEnumerable<Guid> UserIds, string Title, string FirstMessage, User? sender = null, CancellationToken cancellationToken = default);
    public Task<ChatDto> CreateChatWithAdmin(User user, CancellationToken cancellationToken = default);
}
