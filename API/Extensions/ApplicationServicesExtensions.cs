using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
         IConfiguration config)
        {// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<StoreContext>(opt =>
            {
                opt.UseSqlite(config
                .GetConnectionString("DefaultConnection"));
            });

            services.AddLogging();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
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