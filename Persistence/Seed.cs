using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Patients.Any()) return;
            
            var patients = new List<Patient>
            {
                  new Patient
                {
                    Name = "Patient 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "Covid-19",
                    City = "London",
                    
                },
                new Patient
                {
                    Name = "Patient 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "Covid-19",
                    City = "Paris",
                    
                },
                new Patient
                {
                    Name = "Patient 3",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Activity 1 month in future",
                    Category = "Covid-19",
                    City = "London",
                   
                },
                new Patient
                {
                    Name = "Patient 2",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Activity 2 months in future",
                    Category = "Covid-19",
                    City = "London",
                    
                },
                new Patient
                {
                    Name = "Patient 3",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Activity 3 months in future",
                    Category = "Covid-19",
                    City = "London",
                    
                },
                new Patient
                {
                    Name = "Patient 4",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "Activity 4 months in future",
                    Category = "Covid",
                    City = "London",
                   
                },
                new Patient
                {
                    Name = "Patient 5",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Activity 5 months in future",
                    Category = "covid-19",
                    City = "London",
                   
                },
                new Patient
                {
                    Name = "Patient 6",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "Activity 6 months in future",
                    Category = "Covid-19",
                    City = "London",
                    
                },
                new Patient
                {
                    Name = "Patient 7",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "Activity 2 months ago",
                    Category = "Covid-19",
                    City = "London",
                  
                },
                new Patient
                {
                    Name = "Patient 8",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Activity 8 months in future",
                    Category = "Covid-19",
                    City = "London",
                    
                }
            };

            await context.Patients.AddRangeAsync(patients);
            await context.SaveChangesAsync();
        }
    }
}