using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Chat;
using MessageApp.Dto.Message;
using MessageApp.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Queries.Chats.GetChats;
public record GetChatsQuery(): IRequest<IEnumerable<ChatDto>>;

public class GetChatsQueryHandler : IRequestHandler<GetChatsQuery, IEnumerable<ChatDto>>
{
    readonly IReadRepository<Chat> _readRepository;
    readonly IReadRepository<Message> _messageReadRepository;
    readonly User _user;
    readonly IMapper _mapper;

    public GetChatsQueryHandler(IReadRepository<Chat> readRepository, IReadRepository<Message> messageReadRepository, User user, IMapper mapper)
    {
        _readRepository = readRepository;
        _messageReadRepository = messageReadRepository;
        _user = user;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ChatDto>> Handle(GetChatsQuery request, CancellationToken cancellationToken)
    {
        var chats = await _readRepository.GetWhere(x => x.Users.Any(x => x.Id == _user.Id))
                          .AsNoTracking()
                          .Include(x=>x.Users)
                          .AsSplitQuery()
                          .ToListAsync(cancellationToken);

        var payload = _mapper.Map<IEnumerable<ChatDto>>(chats);
        foreach (var chat in payload)
        {
            var lastMessage = await _messageReadRepository.GetWhere(x=> x.ChatId == chat.Id).Include(x => x.Sender).OrderByDescending(x=>x.CreatedDate).FirstOrDefaultAsync();
            chat.LastMessage = _mapper.Map<MessageDto>(lastMessage);
            chat.Users = chat.Users.Where(x => x.Id != _user.Id);
        }
        return payload;
    }
}
