using MediatR;
using MessageApp.Commands.Friends.ApproveFriendRequest;
using MessageApp.Commands.Friends.SendFriendRequest;
using MessageApp.Queries.Friends.GetFriendRequests;
using MessageApp.Queries.Friends.GetFriends;
using MessageApp.Queries.Friends.GetUsersByName;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessageApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FriendsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FriendsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _mediator.Send(new GetFriendsQuery()));
        }

        [HttpGet("search-users-by-name")]
        public async Task<IActionResult> SearchUsersByName([FromQuery] string UserName)
        {
            return Ok(await _mediator.Send(new GetUsersByNameQuery(UserName)));
        }

        [HttpGet("friend-requests")]
        public async Task<IActionResult> GetFriendRequests()
        {
            return Ok(await _mediator.Send(new GetFriendRequestsQuery()));
        }

        [HttpPost("send-friend-request")]
        public async Task<IActionResult> SendFriendRequest([FromBody] SendFriendRequestCommand command)
        {
            return Ok(await _mediator.Send(command));
        }     
        
        [HttpPost("friend-requests/approve")]
        public async Task<IActionResult> ApproveFriendRequest([FromBody] ApproveFriendRequestCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
