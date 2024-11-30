using MediatR;
using MessageApp.Queries.Messages.GetMessages;
using Microsoft.AspNetCore.Mvc;

namespace MessageApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Messages : ControllerBase
    {
        readonly IMediator _mediator;

        public Messages(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get() {
            return Ok(await _mediator.Send(new GetMessagesQuery(new Guid())));
        }
    }
}
