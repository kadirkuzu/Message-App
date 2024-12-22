using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Chat;

namespace MessageApp.Features.Mappings;

public class ChatProfile : Profile
{
    public ChatProfile()
    {
        CreateMap<Chat, ChatDto>().ReverseMap();
    }
}
