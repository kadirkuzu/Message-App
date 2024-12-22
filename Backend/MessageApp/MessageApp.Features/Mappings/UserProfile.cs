using AutoMapper;
using MessageApp.Domain.Entities;
using MessageApp.Dto.Friend;
using MessageApp.Dto.User;

namespace MessageApp.Features.Mappings;
public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<User, FriendDto>().ReverseMap();
    }
}
