using KashiVibes.Core.Interfaces;
using KashiVibes.Infrastructure.Data;
using KashiVibes.Infrastructure.Data.Repositories;
using KashiVibes.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KashiVibes.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // SQL Helper
            services.AddScoped<SqlHelper>();

            // Repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPackageRepository, PackageRepository>();
            services.AddScoped<IBookingRepository, BookingRepository>();
            services.AddScoped<IUserReviewRepository, UserReviewRepository>();

            // Services
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}