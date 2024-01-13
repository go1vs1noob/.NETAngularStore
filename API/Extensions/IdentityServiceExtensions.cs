
using Core.Entities.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
         IConfiguration configuration)
        {   
            services.AddDbContext<AppIdentityDbContext>(opt =>
            {
                opt.UseSqlite(configuration.GetConnectionString("IdentityConnection"));
            });
            services.AddIdentityCore<AppUser>(opt =>
            {
                // can add identity options here
            })
            .AddEntityFrameworkStores<AppIdentityDbContext>()     // store users inside database
            .AddSignInManager<SignInManager<AppUser>>();
            services.AddAuthentication();
            services.AddAuthorization();

            return services;
        }

    }
}