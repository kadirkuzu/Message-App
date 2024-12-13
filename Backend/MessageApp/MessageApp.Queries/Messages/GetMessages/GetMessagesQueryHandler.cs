using MessageApp.Domain.Entities;
using MessageApp.Dto.Message;
using MessageApp.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Queries.Messages.GetMessages; 

public record GetMessagesQuery (Guid GroupId) : IRequest<IEnumerable<MessageDto>>;
public class GetMessagesQueryHandler : IRequestHandler<GetMessagesQuery, IEnumerable<MessageDto>>
{
    readonly IReadRepository<Message> _messages;
    readonly User _user;

    public GetMessagesQueryHandler(IReadRepository<Message> messages, User user)
    {
        _messages = messages;
        _user = user;
    }

    public async Task<IEnumerable<MessageDto>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        var userId = _user.Id;
        var messages = await _messages.GetAll().AsNoTracking().ToListAsync(cancellationToken);
        return messages.Select(x => new MessageDto());
    }
}
