using Domain;
using FluentValidation;

namespace Application.Vaccinations
{
    public class VaccinationValidator : AbstractValidator<Vaccination>
    {
        public VaccinationValidator()
        {
            RuleFor(x=> x.Name).NotEmpty();
            RuleFor(x=> x.Capacity).NotEmpty();
            RuleFor(x=> x.Schedule).NotEmpty();
            RuleFor(x=> x.ContactNumber).NotEmpty();
            RuleFor(x=> x.Email).NotEmpty();
            RuleFor(x=> x.City).NotEmpty();
        }
    }
}

