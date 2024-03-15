using System.Security.Cryptography.X509Certificates;
using API.Extensions;
using API.Middleware;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
                    {
                        serverOptions.ConfigureHttpsDefaults(httpsOptions =>
                        {
                            // Load the certificate from the .pfx file
                            var certificate =
                                new X509Certificate2(Path.Combine(
                                    Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location),
                                    "Certificates", "API.pfx"),
                                        "pass");

                            // Set the loaded certificate as the server certificate
                            httpsOptions.ServerCertificate = certificate;
                        });
                    });

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddSwaggerDocumentation();

var app = builder.Build();

// Configure the HTTP request pipeline.

// for server errors
app.UseMiddleware<ExceptionMiddleware>();

// for errors with empty bodies
app.UseStatusCodePagesWithReExecute("/errors/{0}");


if (app.Environment.IsDevelopment())
{
    app.UseSwaggerDocumentation();
}

// app.UseHttpsRedirection();

app.UseStaticFiles();
// using Cors from ApplicationServicesExtensions
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Creating database from code - each time new migrations will be applied and database created
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<StoreContext>();
var identityContext = services.GetRequiredService<AppIdentityDbContext>();
var userManager = services.GetRequiredService<UserManager<AppUser>>();
var logger = services.GetRequiredService<ILogger<Program>>();



try
{
    await context.Database.MigrateAsync();
    await identityContext.Database.MigrateAsync();

    await StoreContextSeed.SeedAsync(context);
    await AppIdentityDbContextSeed.SeedUsersAsync(userManager);  // extension methods
}
catch (System.Exception ex)
{
    logger.LogError(ex, "Error during migration");
}

app.Run();

