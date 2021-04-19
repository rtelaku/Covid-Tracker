using Domain;
using FluentValidation;

namespace Application.Patients
{
    public class PatientValidator : AbstractValidator<Patient>
    {
        public PatientValidator()
        {
            RuleFor(x=> x.Name).NotEmpty();
            RuleFor(x=> x.Date).NotEmpty();
            RuleFor(x=> x.Description).NotEmpty();
            RuleFor(x=> x.Category).NotEmpty();
            RuleFor(x=> x.City).NotEmpty();
        }
    }
}