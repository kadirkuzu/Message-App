using MessageApp.Dto.Common;

namespace MessageApp.Services.Abstract.SignalR.HubServices; 

public interface IMessageHubService
{
    Task Send(string target, SignalRNotificationDto message);
    Task SendToUser(Guid userId,string target, SignalRNotificationDto message);
    Task SendToGroup(string group,string target, SignalRNotificationDto message);
}
