using MessageApp.Commands.Messages.AddMessage;
using MessageApp.Domain.Entities;
using MessageApp.Queries.Messages.GetMessages;
using MessageApp.Repository.Abstract;
using MessageApp.Repository.Concrete;
using MessageApp.Repository.Concrete.Contexts;
using MessageApp.Services;
using MessageApp.Services.Concrete.Storage.Azure;
using Microsoft.AspNetCore.Http;
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
            services.AddServices();
            services.AddStorage<AzureStorage>();
            services.AddDbContext<MessageAppDbContext>(options => options.UseNpgsql(Configuration.ConnectionString));
            services.AddIdentity<User, UserRole>().AddEntityFrameworkStores<MessageAppDbContext>();
            services.AddScoped(typeof(IReadRepository<>), typeof(ReadRepository<>));
            services.AddScoped(typeof(IWriteRepository<>), typeof(WriteRepository<>));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<User>(serviceProvider =>
            {
                var httpContextAccessor = serviceProvider.GetRequiredService<IHttpContextAccessor>();
                var user = httpContextAccessor.HttpContext?.User;
                var fullName = GetValueFromClaim(user, ClaimTypes.Name.ToString());

                return new User
                {
                    Id = Guid.Parse(GetValueFromClaim(user, "userId")),
                    UserName = GetValueFromClaim(user, ClaimTypes.NameIdentifier),
                    FullName = GetValueFromClaim(user, ClaimTypes.Name.ToString()),
                    Email = GetValueFromClaim(user, ClaimTypes.Email.ToString()),
                    PhoneNumber = GetValueFromClaim(user, ClaimTypes.Email.ToString())
                }; ;
            });
        }
        private static string GetValueFromClaim(ClaimsPrincipal? user,string claimType)
        {
            return user?.Claims.First(x => x.Type.Equals(claimType)).Value ?? "";
        }
    }
}
