using MessageApp.Services.Abstract.Storage;
using MessageApp.Services.Concrete.Storage;
using Microsoft.Extensions.DependencyInjection;

namespace MessageApp.Services
{
    public static class ServiceRegistration
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IStorageService, StorageService>();
        }
        public static void AddStorage<T>(this IServiceCollection services) where T : class, IStorage
        {
            services.AddScoped<IStorage, T>();
        }
    }
}
