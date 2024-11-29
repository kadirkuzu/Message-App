using MessageApp.Services.Abstract.SignalR.HubServices;
using Microsoft.AspNetCore.SignalR;

namespace MessageApp.Services.Concrete.Signalr;

public class SignalRService : IMessageHubService
{
    readonly IHubContext<SignalRHub> _hubContext;

    public SignalRService(IHubContext<SignalRHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public Task Send(string target, string message)
    {
        return _hubContext.Clients.All.SendAsync(target, message);
    }

    public Task SendToGroup(string group, string target, string message)
    {
        return _hubContext.Clients.Group(group).SendAsync(target, message);
    }

    public Task SendToUser(Guid userId, string target, string message)
    {
        return _hubContext.Clients.User(userId.ToString()).SendAsync(target, message);
    }
}
