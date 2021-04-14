using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //mapping from an patient to patient
            CreateMap<Patient, Patient>();
        }
    }
}