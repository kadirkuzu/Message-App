using MessageApp.Dto.User;

namespace MessageApp.Services.Abstract;

public interface ITokenHandler
{
    UserToken CreateAccessToken();
    string CreateRefreshToken();
}
