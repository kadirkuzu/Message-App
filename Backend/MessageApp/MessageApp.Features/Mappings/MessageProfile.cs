using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Message;

namespace MessageApp.Features.Mappings;
public class MessageProfile : Profile
{
    public MessageProfile()
    {
        CreateMap<Message, MessageDto>().ReverseMap();
    }
}
