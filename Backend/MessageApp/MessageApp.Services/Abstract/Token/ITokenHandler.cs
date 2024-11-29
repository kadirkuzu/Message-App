using MessageApp.Dto.User;

namespace MessageApp.Services.Abstract.Token; 

public interface ITokenHandler
{
    UserToken CreateAccessToken();
}
