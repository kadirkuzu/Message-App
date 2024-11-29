using MessageApp.Services.Concrete.Signalr;

namespace MessageApp.Services.Abstract.SignalR.HubServices; 

public interface IMessageHubService
{
    Task Send(string target, string message);
    Task SendToUser(Guid userId,string target, string message);
    Task SendToGroup(string group,string target, string message);
}
