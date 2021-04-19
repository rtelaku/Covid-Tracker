using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Patients
{
    public class Details
    {
           public class Query : IRequest<Result<Patient>>
        {
           public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Patient>>
        {

            private readonly DataContext _context;
            public Handler(DataContext context)
            {
               _context = context;
            }

            public async Task<Result<Patient>> Handle(Query request, CancellationToken cancellationToken)
           {
               var patient = await _context.Patients.FindAsync(request.Id);

               return Result<Patient>.Success(patient);
           }
        }
    }
}