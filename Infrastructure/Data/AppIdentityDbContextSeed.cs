using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "Bob@test.com",
                    UserName = "Bob@test.com",
                    Address = new Address
                    {
                        FirstName = "Bob",
                        LastName = "Bobsen",
                        State = "NY",
                        Street = "Street",
                        City = "New York",
                        
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd_[]");
            }
        }
    }
}