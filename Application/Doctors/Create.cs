using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;


namespace Application.Doctors
{
    public class Create
    {
           //a command doesn't return anything bit it can, in this case were gonna return the result
      public class Command : IRequest<Result<Unit>>
      { 
      public Doctor Doctor{ get; set; }
      }

        public class CommanvValidator : AbstractValidator<Command>
        {
            public CommanvValidator()
            {
                RuleFor(x => x.Doctor).SetValidator(new DoctorValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;

            public Handler(DataContext context)
            {
            _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //we're adding an activity on memory not database
                _context.Doctors.Add(request.Doctor);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to add the new doctor!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}