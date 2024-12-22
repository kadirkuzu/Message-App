using MessageApp.Commands.Messages.AddMessage;
using MessageApp.Domain.Entities;
using MessageApp.Features.Mappings;
using MessageApp.Queries.Messages.GetMessages;
using MessageApp.Repository.Abstract;
using MessageApp.Repository.Concrete;
using MessageApp.Repository.Concrete.Contexts;
using MessageApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;

namespace MessageApp.Features
{
    public static class ServiceRegistration
    {
        public static void AddFeaturesServices(this IServiceCollection services)
        {
            services.AddMediatR(options => options.RegisterServicesFromAssemblies(typeof(GetMessagesQuery).Assembly, typeof(AddMessageCommand).Assembly));
            services.AddAutoMapper(typeof(MessageProfile).Assembly);
            services.AddServices();
            services.AddDbContext<MessageAppDbContext>(options => options.UseNpgsql(Configuration.ConnectionString));
            services.AddIdentity<User, UserRole>().AddEntityFrameworkStores<MessageAppDbContext>();
            services.AddScoped(typeof(IReadRepository<>), typeof(ReadRepository<>));
            services.AddScoped(typeof(IWriteRepository<>), typeof(WriteRepository<>));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<User>(serviceProvider =>
            {
                var httpContextAccessor = serviceProvider.GetRequiredService<IHttpContextAccessor>();
                var contextUser = httpContextAccessor.HttpContext?.User;
                UserManager<User> userManager = serviceProvider.GetRequiredService<UserManager<User>>();

                var userId = Guid.Parse(GetValueFromClaim(contextUser, ClaimTypes.NameIdentifier));
                var user = userManager.Users.First(x=>x.Id == userId);

                return new User
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    FullName = user.FullName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    HasPhoto = user.HasPhoto
                }; ;
            });
        }
        private static string GetValueFromClaim(ClaimsPrincipal? user,string claimType)
        {
            return user?.Claims.First(x => x.Type.Equals(claimType)).Value ?? "";
        }
    }
}
