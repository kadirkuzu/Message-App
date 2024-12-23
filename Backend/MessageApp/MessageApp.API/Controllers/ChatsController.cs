using MediatR;
using MessageApp.Commands.Chats.AddChat;
using MessageApp.Commands.Chats.UploadImage;
using MessageApp.Commands.Users.UploadImage;
using MessageApp.Queries.Chats.GetChats;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessageApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChatsController(IMediator mediator) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var query = await mediator.Send(new GetChatsQuery());
            return Ok(query);
        }    
        
        [HttpPost]
        public async Task<IActionResult> Add(AddChatCommand command)
        {
            var query = await mediator.Send(command);
            return Ok(query);
        } 

        [HttpPost("{chatId}/upload-image")]
        public async Task<IActionResult> UploadGroupImage(Guid chatId)
        {
            var command = new UploadGroupImageCommand(chatId, Request.Form.Files);
            return Ok(await mediator.Send(command));
        }
    }
}
