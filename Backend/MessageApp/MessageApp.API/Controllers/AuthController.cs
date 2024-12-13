using MediatR;
using MessageApp.Commands.Auth.CreateUser;
using MessageApp.Commands.Auth.Login;
using MessageApp.Commands.Auth.RefreshToken;
using MessageApp.Queries.Auth.CheckUserNameAvailable;
using MessageApp.Queries.Auth.GetMe;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<IActionResult> CreateAccount(CreateUserCommand command)
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

        [HttpGet("check-user-name-available")]
        public async Task<IActionResult> CheckUserNameAvailable([FromQuery] CheckUserNameAvailableQuery command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> Me()
        {
            return Ok(await _mediator.Send(new GetMeQuery()));
        }
    }
}
