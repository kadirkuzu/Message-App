using MessageApp.Application.Abstractions.Storage;
using MessageApp.Infrastructure.Services;
using MessageApp.Infrastructure.Services.Storage;
using Microsoft.Extensions.DependencyInjection;

namespace MessageApp.Infrastructure;

public static class ServiceRegistration
{
    public static void AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddScoped<IStorageService, StorageService>();
    }

    public static void AddStorage<T>(this IServiceCollection services) where T : class, IStorage
    {
        services.AddScoped<IStorage, T>();
    }
}