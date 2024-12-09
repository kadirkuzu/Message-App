using MediatR;
using MessageApp.Commands.Auth.CreateUser;
using MessageApp.Commands.Auth.Login;
using MessageApp.Commands.Auth.RefreshToken;
using Microsoft.AspNetCore.Mvc;

namespace MessageApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-account")] 
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
