using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
    
        public DbSet<Photo> Photos {get; set;}
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Vaccination> Vaccinations { get; set; }


    }
}