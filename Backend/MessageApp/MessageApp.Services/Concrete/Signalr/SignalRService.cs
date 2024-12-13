using MessageApp.Domain.Entities;
using MessageApp.Dto.Common;
using MessageApp.Services.Abstract.SignalR.HubServices;
using Microsoft.AspNetCore.SignalR;

namespace MessageApp.Services.Concrete.Signalr;

public class SignalRService : IMessageHubService
{
    readonly IHubContext<SignalRHub> _hubContext;
    readonly User _user;

    public SignalRService(IHubContext<SignalRHub> hubContext, User user)
    {
        _hubContext = hubContext;
        _user = user;
    }

    public async Task Send(string target, SignalRNotificationDto message)
    {
        message.SetUser(_user);
        await _hubContext.Clients.All.SendAsync(target, message);
    }

    public async Task SendToGroup(string group, string target, SignalRNotificationDto message)
    {
        message.SetUser(_user);
        await _hubContext.Clients.Group(group).SendAsync(target, message);
    }

    public async Task SendToUser(Guid userId, string target, SignalRNotificationDto message)
    {
        message.SetUser(_user);
        await _hubContext.Clients.User(userId.ToString()).SendAsync(target, message);
    }
}
