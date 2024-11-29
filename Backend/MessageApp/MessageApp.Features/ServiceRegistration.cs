using MessageApp.Commands.Messages.AddMessage;
using MessageApp.Queries.Messages.GetMessages;
using MessageApp.Repository.Abstract;
using MessageApp.Repository.Concrete;
using MessageApp.Repository.Concrete.Contexts;
using MessageApp.Services;
using MessageApp.Services.Concrete.Storage.Azure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

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
            services.AddScoped(typeof(IReadRepository<>), typeof(ReadRepository<>));
            services.AddScoped(typeof(IWriteRepository<>), typeof(WriteRepository<>));
        }
    }
}
