using Domain;
using FluentValidation;

namespace Application.Doctors
{
   
    public class DoctorValidator : AbstractValidator<Doctor>
    {
        public DoctorValidator()
        {
            RuleFor(x=> x.Name).NotEmpty();
            RuleFor(x=> x.Date).NotEmpty();
            RuleFor(x=> x.ContactNumber).NotEmpty();
            RuleFor(x=> x.City).NotEmpty();
            RuleFor(x=> x.Email).NotEmpty();
        }
}
    }
