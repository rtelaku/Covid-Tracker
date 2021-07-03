using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Vaccinations
{
    public class Create
    {
            public class Command : IRequest<Result<Unit>>
      { 
      public Vaccination Vaccination{ get; set; }
      }

        public class CommanvValidator : AbstractValidator<Command>
        {
            public CommanvValidator()
            {
                RuleFor(x => x.Vaccination).SetValidator(new VaccinationValidator());
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
                _context.Vaccinations.Add(request.Vaccination);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to add the new vaccination center!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
    }
