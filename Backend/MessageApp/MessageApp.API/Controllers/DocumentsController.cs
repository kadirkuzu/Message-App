using MediatR;
using MessageApp.Commands.Documents.UploadImage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessageApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DocumentsController(IMediator mediator) : ControllerBase
    {
        readonly IMediator _mediator = mediator;

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage()
        {
            return Ok(await _mediator.Send(new UploadImageCommand(Request.Form.Files)));
        }
    }
}
