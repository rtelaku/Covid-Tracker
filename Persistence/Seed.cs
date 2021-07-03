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
                    new AppUser{DisplayName = "Rigeita", UserName = "rigeita", Email ="rigeita@gmail.com"},
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
        
             if (context.Doctors.Any()) return;

            Microsoft.EntityFrameworkCore.DbSet<Doctor> doctors1 = context.Doctors;
            var doctors = doctors1;
        
            await context.Doctors.AddRangeAsync(doctors);
            await context.SaveChangesAsync();
        }
        }
    }

