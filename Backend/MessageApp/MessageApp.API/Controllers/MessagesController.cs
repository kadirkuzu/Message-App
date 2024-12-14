using MediatR;
using MessageApp.Queries.Messages.GetMessages;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessageApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessagesController(IMediator mediator) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get() {
            return Ok(await mediator.Send(new GetMessagesQuery(new Guid())));
        }
    }
}
