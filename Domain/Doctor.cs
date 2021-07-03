using System;

namespace Domain
{
    public class Doctor
    {
        public Guid Id { get; set; }
        public string Name{ get; set; }
        public string PersonalId{ get; set; }
        public DateTime Date { get; set; }
        public string ContactNumber { get; set; }
        public string City { get; set; }  
        public string Email { get; set; }   

    }
}