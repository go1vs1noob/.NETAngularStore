
using System.Text;
using Core.Entities.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme) // sending bearer token to be recieved by identity
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true, // make sure it's signed by our server
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Key"])), // which key to check against (the same from TokenService)
                        ValidIssuer = configuration["Token:Issuer"], // make sure issuer is our server
                        ValidateIssuer = true
                    };
                });
            services.AddAuthorization();

            return services;
        }

    }
}