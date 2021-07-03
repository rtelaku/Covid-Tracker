using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Vaccinations
{
    public class Edit
    {
         public class Command : IRequest<Result<Unit>>
        {
        public Vaccination Vaccination { get; set; }
        }

         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Vaccination).SetValidator(new VaccinationValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var vaccination = await _context.Vaccinations.FindAsync(request.Vaccination.Id);

                if(vaccination == null) return null;

                _mapper.Map(request.Vaccination, vaccination); 
                
                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to edit the vaccination center");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}