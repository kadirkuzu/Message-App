using Microsoft.Extensions.Configuration;

namespace MessageApp.Features
{
    static class Configuration
    {
        private static string GetValue (string value)
        {
            ConfigurationManager configurationManager = new();
            configurationManager.SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../MessageApp.API"));
            configurationManager.AddJsonFile("appsettings.json");
            return configurationManager.GetConnectionString(value);
        }
        public static string ConnectionString
        {
            get
            {
                return GetValue("PostgreSQL");
            }
        }
    }
}
