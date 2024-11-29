using MessageApp.Domain.Entities;
using MessageApp.Dto.Message;
using MessageApp.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Queries.Messages.GetMessages; 

public record GetMessagesQuery (Guid GroupId) : IRequest<IEnumerable<MessageDto>>;
public class GetMessagesQueryHandler : IRequestHandler<GetMessagesQuery, IEnumerable<MessageDto>>
{
    readonly IReadRepository<Message> _messages;

    public GetMessagesQueryHandler(IReadRepository<Message> messages)
    {
        _messages = messages;
    }

    public async Task<IEnumerable<MessageDto>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        return _messages.GetAll().AsNoTracking().Select(x=>new MessageDto());
    }
}
