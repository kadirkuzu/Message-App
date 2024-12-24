using MediatR;
using MessageApp.Commands.Messages.AddMessage;
using MessageApp.Commands.Messages.SendMessageToAll;
using MessageApp.Domain.Constants;
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
        [HttpGet("{chatId}")]
        public async Task<IActionResult> Get(Guid chatId) {
            return Ok(await mediator.Send(new GetMessagesQuery(chatId)));
        }      
        [HttpPost]
        public async Task<IActionResult> Send(AddMessageCommand command) {
            return Ok(await mediator.Send(command));
        }

        [HttpPost("send-to-all")]
        [Authorize(Roles = UserRoles.SuperAdminOrAdmin)]
        public async Task<IActionResult> SendToAll(SendMessageToAllCommand command) {
            await mediator.Send(command);
            return Ok();
        }

    }
}
