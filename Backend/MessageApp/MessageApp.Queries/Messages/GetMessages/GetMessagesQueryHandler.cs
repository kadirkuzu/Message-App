using MessageApp.Dto.Message;

namespace MessageApp.Queries.Messages.GetMessages; 

public record GetMessagesQuery (int Skip, int Take, Guid GroupId) : IRequest<MessageDto>;
public class GetMessagesQueryHandler : IRequestHandler<GetMessagesQuery, MessageDto>
{
    public Task<MessageDto> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
