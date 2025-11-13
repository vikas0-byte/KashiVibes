using KashiVibes.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace KashiVibes.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IPackageService, PackageService>();

            return services;
        }
    }
}