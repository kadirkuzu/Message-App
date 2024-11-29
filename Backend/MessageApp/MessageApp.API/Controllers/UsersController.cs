using MediatR;
using MessageApp.Commands.Users.CreateUser;
using MessageApp.Commands.Users.Login;
using MessageApp.Commands.Users.RefreshToken;
using Microsoft.AspNetCore.Mvc;

namespace MessageApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost] 
        public async Task<IActionResult> Create(CreateUserCommand command)
        {
            return Ok(await _mediator.Send(command));
        }       
        
        [HttpPost("[action]")] 
        public async Task<IActionResult> Login(LoginCommand command)
        {
            return Ok(await _mediator.Send(command));
        }  
        
        [HttpPost("[action]")] 
        public async Task<IActionResult> RefreshToken(RefreshTokenCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
