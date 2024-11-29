using MessageApp.Services.Abstract.Storage;
using MessageApp.Services.Abstract.Token;
using MessageApp.Services.Concrete.Storage;
using MessageApp.Services.Concrete.Token;
using Microsoft.Extensions.DependencyInjection;

namespace MessageApp.Services
{
    public static class ServiceRegistration
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IStorageService, StorageService>();
            services.AddScoped<ITokenHandler, TokenHandler>();
        }
        public static void AddStorage<T>(this IServiceCollection services) where T : class, IStorage
        {
            services.AddScoped<IStorage, T>();
        }
    }
}
