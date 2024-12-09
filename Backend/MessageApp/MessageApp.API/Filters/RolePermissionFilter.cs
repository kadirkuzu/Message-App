using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;

namespace MessageApp.API.Filters
{
    public class RolePermissionFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            //var hasRole = ...
            //if(!hasRole)
            //{
            //    context.Result= new UnauthorizedResult();
            //}
            //else
                await next();
        }
    }
}
