using MessageApp.Application.Services;
using MessageApp.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace MessageApp.Infrastructure;

public static class ServiceRegistration
{
    public static void AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddScoped<IFileService, FileService>();
    }
}