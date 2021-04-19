using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Patients
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
        public Patient Patient { get; set; }
        }

         public class CommanvValidator : AbstractValidator<Command>
        {
            public CommanvValidator()
            {
                RuleFor(x => x.Patient).SetValidator(new PatientValidator());
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
                var patient = await _context.Patients.FindAsync(request.Patient.Id);

                if(patient == null) return null;

                _mapper.Map(request.Patient, patient); 
                
                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to edit the patient");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}