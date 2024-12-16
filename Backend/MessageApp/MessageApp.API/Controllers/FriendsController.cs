using MediatR;
using MessageApp.Commands.Friends.ApproveFriendRequest;
using MessageApp.Commands.Friends.CancelFriendRequest;
using MessageApp.Commands.Friends.SendFriendRequest;
using MessageApp.Queries.Friends.GetFriendRequests;
using MessageApp.Queries.Friends.GetFriends;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessageApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FriendsController(IMediator mediator) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await mediator.Send(new GetFriendsQuery()));
        }

        [HttpGet("friend-requests")]
        public async Task<IActionResult> GetFriendRequests()
        {
            return Ok(await mediator.Send(new GetFriendRequestsQuery()));
        }

        [HttpPost("friend-requests/send")]
        public async Task<IActionResult> SendFriendRequest([FromBody] SendFriendRequestCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpPost("friend-requests/cancel")]
        public async Task<IActionResult> CancelFriendRequest([FromBody] CancelFriendRequestCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpPost("friend-requests/approve")]
        public async Task<IActionResult> ApproveFriendRequest([FromBody] ApproveFriendRequestCommand command)
        {
            return Ok(await mediator.Send(command));
        }
    }
}
