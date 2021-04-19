using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName = "bob", Email ="bob@test.com"},
                    new AppUser{DisplayName = "Tom", UserName = "tom", Email ="tom@test.com"},
                    new AppUser{DisplayName = "Jane", UserName = "jane", Email ="jane@test.com"},
                    
                };
                
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Patients.Any()) return;

            Microsoft.EntityFrameworkCore.DbSet<Patient> patients1 = context.Patients;
            var patients = patients1;
        
            await context.Patients.AddRangeAsync(patients);
            await context.SaveChangesAsync();
        }
    }
}