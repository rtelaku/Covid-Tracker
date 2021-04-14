using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Patients
{
    public class Delete
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var patient = await _context.Patients.FindAsync(request.Id);
                _context.Remove(patient);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}