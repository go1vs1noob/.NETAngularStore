using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
         IConfiguration config)
        {
            services.AddDbContext<StoreContext>(opt =>
            {
                opt.UseSqlite(config
                .GetConnectionString("DefaultConnection"));
            });
        
            // Redis
            services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                var options = ConfigurationOptions.Parse(config.GetConnectionString("Redis"));
                return ConnectionMultiplexer.Connect(options);
            });

            services.AddLogging();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // edit validation behaviour (flatten errors array for consistency)
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    // just get error messages, 
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        // flattens an array
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();
                    var errorResponse = new ApiValidationErrorResponce
                    {
                        Errors = errors
                    };
                    return new BadRequestObjectResult(errorResponse);
                };

            });

            // add CORS support
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader();
                    // for angular development
                    policy.AllowAnyMethod().WithOrigins("http://localhost:4200");
                });
            });
            return services;
        }
    }
}