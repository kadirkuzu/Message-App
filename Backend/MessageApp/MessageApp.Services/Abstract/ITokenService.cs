using MessageApp.Domain.Entities;
using MessageApp.Dto.User;

namespace MessageApp.Services.Abstract;

public interface ITokenService
{
    Task<UserToken> CreateAccessToken(User user);
    string CreateRefreshToken();
}
