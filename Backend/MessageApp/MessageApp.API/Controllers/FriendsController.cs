using MediatR;
using MessageApp.Commands.Friends.SendFriendRequest;
using MessageApp.Queries.Friends.GetFriendRequests;
using MessageApp.Queries.Friends.GetUsersByName;
using MessageApp.Queries.Messages.GetMessages;
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

        [HttpGet("search-users-by-name")]
        public async Task<IActionResult> Get([FromQuery] string UserName)
        {
            return Ok(await _mediator.Send(new GetUsersByNameQuery(UserName)));
        }

        [HttpGet("friend-requests")]
        public async Task<IActionResult> GetFriendRequests()
        {
            return Ok(await _mediator.Send(new GetFriendRequestsQuery()));
        }

        [HttpPost("send-friend-request")]
        public async Task<IActionResult> Post([FromBody] SendFriendRequestCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
