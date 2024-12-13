using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace MessageApp.Services.Concrete.Signalr
{
    [Authorize]
    public class SignalRHub : Hub
    {
        public async Task JoinGroup(string groupName)
        {
            var user = Context.User;
            if (user != null && user.Identity!.IsAuthenticated)
                await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            else
                await Clients.Caller.SendAsync("ReceiveMessage", "Unauthorized");
            
        }

        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }
    }
}
