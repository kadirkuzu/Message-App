using MediatR;
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
    }
}
