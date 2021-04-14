using System;

namespace Domain
{
    public class Patient
    {
        public Guid Id { get; set; }
        public string Name{ get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }  
    }
}