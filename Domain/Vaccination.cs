using System;

namespace Domain
{
    public class Vaccination
    {
        public Guid Id { get; set; }
        public string Name{ get; set; }
        public string PersonalId{ get; set; }
        public string Capacity{get; set;}
        public string Schedule {get; set;}
        public string ContactNumber { get; set; }
        public string Email { get; set; }   
        public string City { get; set; }  

    }
}