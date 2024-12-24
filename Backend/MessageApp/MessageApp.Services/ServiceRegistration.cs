using MessageApp.Domain.Constants;
using MessageApp.Domain.Entities;
using MessageApp.Repository.Concrete.Contexts;
using MessageApp.Services.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Abstract.Storage;
using MessageApp.Services.Concrete;
using MessageApp.Services.Concrete.Signalr;
using MessageApp.Services.Concrete.Storage;
using MessageApp.Services.Concrete.Storage.Azure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MessageApp.Services
{
    public static class ServiceRegistration
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IStorageService, StorageService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IChatService, ChatService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddTransient<IMessageHubService, SignalRService>();
            services.AddHttpContextAccessor();
            services.AddSignalR();
            services.AddStorage<AzureStorage>();
        }
        public static void AddSignalRHub(this WebApplication webApplication) {
            webApplication.MapHub<SignalRHub>("/messages-signalr-hub");
        }

        public static void AddStorage<T>(this IServiceCollection services) where T : class, IStorage
        {
            services.AddScoped<IStorage, T>();
        }

        public static async Task InitializeRolesAsync(this IServiceCollection services)
        {
            using var serviceScope = services.BuildServiceProvider().CreateScope();
            var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<UserRole>>();
            var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<User>>();
            var configuration = serviceScope.ServiceProvider.GetRequiredService<IConfiguration>();

            var roles = new[] { UserRoles.SuperAdmin,UserRoles.User, UserRoles.Admin };
            var hasRole = await roleManager.RoleExistsAsync(UserRoles.SuperAdmin);

            if (hasRole) return;

            foreach (var role in roles)
            {
                var roleExists = await roleManager.RoleExistsAsync(role);

                if (!roleExists)
                {
                    await roleManager.CreateAsync(new(){Name = role});
                }
            }

            var userName = configuration["App:AdminUserName"];
            var user = await userManager.FindByNameAsync(userName!);
            if (user == null)
            {
                var email = configuration["App:AdminEmail"];
                var password = configuration["App:AdminPassword"];

                var newUser = new User(email!, userName!, userName!);
                await userManager.CreateAsync(newUser, password!);
                await userManager.AddToRoleAsync(newUser, UserRoles.SuperAdmin);
            }
        }
    }
}
