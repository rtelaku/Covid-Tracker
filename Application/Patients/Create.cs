using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Patients
{
    public class Create
    {
        //a command doesn't return anything
      public class Command : IRequest
      { 
      public Patient Patient{ get; set; }
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
                //we're adding an activity on memory not database
                _context.Patients.Add(request.Patient);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}