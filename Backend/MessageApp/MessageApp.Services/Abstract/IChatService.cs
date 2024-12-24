using MessageApp.Dto.Chat;

namespace MessageApp.Services.Abstract;

public interface IChatService
{
    public Task<ChatDto> CreateChat(IEnumerable<Guid> UserIds, string Title, string FirstMessage, CancellationToken cancellationToken = default);
    public Task<ChatDto> CreateChatWithAdmin(Guid UserId, CancellationToken cancellationToken = default);
}
