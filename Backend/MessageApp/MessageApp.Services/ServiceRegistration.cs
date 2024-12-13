using MessageApp.Services.Abstract;
using MessageApp.Services.Abstract.SignalR.HubServices;
using MessageApp.Services.Abstract.Storage;
using MessageApp.Services.Concrete;
using MessageApp.Services.Concrete.Signalr;
using MessageApp.Services.Concrete.Storage;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace MessageApp.Services
{
    public static class ServiceRegistration
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IStorageService, StorageService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddTransient<IMessageHubService, SignalRService>();
            services.AddSignalR();

        }
        public static void AddSignalRHub(this WebApplication webApplication) {
            webApplication.MapHub<SignalRHub>("/signalr-hub");
        }

        public static void AddStorage<T>(this IServiceCollection services) where T : class, IStorage
        {
            services.AddScoped<IStorage, T>();
        }
    }
}
