﻿using MediatR;
using MessageApp.Commands.Users.UpdateUser;
using MessageApp.Commands.Users.UploadImage;
using MessageApp.Queries.Auth.GetMe;
using MessageApp.Queries.Friends.GetUsersByName;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessageApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController(IMediator mediator) : ControllerBase
    {

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateUserCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage()
        {
            return Ok(await mediator.Send(new UploadImageCommand(Request.Form.Files)));
        }

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            return Ok(await mediator.Send(new GetMeQuery()));
        }


        [HttpGet("search-users-by-name")]
        public async Task<IActionResult> SearchUsersByName([FromQuery] string UserName)
        {
            return Ok(await mediator.Send(new GetUsersByNameQuery(UserName)));
        }
    }
}
