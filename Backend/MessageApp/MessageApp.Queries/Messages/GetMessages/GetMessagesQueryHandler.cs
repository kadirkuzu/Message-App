using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Message;
using MessageApp.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Queries.Messages.GetMessages; 

public record GetMessagesQuery (Guid ChatId) : IRequest<IEnumerable<MessageDto>>;
public class GetMessagesQueryHandler : IRequestHandler<GetMessagesQuery, IEnumerable<MessageDto>>
{
    readonly IReadRepository<Message> _readRepository;
    readonly IWriteRepository<Message> _writeRepository;
    readonly IReadRepository<Chat> _chatsReadRepository;
    readonly IWriteRepository<Chat> _chatsWriteRepository;
    readonly IMapper _mapper;

    public GetMessagesQueryHandler(IReadRepository<Message> readRepository, IReadRepository<Chat> chatsReadRepository, IMapper mapper, IWriteRepository<Chat> chatsWriteRepository, IWriteRepository<Message> writeRepository)
    {
        _readRepository = readRepository;
        _chatsReadRepository = chatsReadRepository;
        _mapper = mapper;
        _chatsWriteRepository = chatsWriteRepository;
        _writeRepository = writeRepository;
    }

    public async Task<IEnumerable<MessageDto>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        var messages = await _readRepository
                            .GetWhere(x=>x.ChatId == request.ChatId)
                            .ToListAsync(cancellationToken);

        foreach (var message in messages)
        {
            message.Read();
        }

        var chat = await _chatsReadRepository.GetFirstAsync(x=>x.Id == request.ChatId);
        chat.ReadAll();

        await _chatsWriteRepository.SaveAsync();
        await _writeRepository.SaveAsync();

        return _mapper.Map<IEnumerable<MessageDto>>(messages);
    }
}
