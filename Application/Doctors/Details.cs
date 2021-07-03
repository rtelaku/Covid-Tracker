using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;


namespace Application.Doctors
{
    public class Details
    {
         public class Query : IRequest<Result<Doctor>>
        {
           public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Doctor>>
        {

            private readonly DataContext _context;
            public Handler(DataContext context)
            {
               _context = context;
            }

            public async Task<Result<Doctor>> Handle(Query request, CancellationToken cancellationToken)
           { 
               var doctor = await _context.Doctors.FindAsync(request.Id);

               return Result<Doctor>.Success(doctor);
           }
        }   
    }
}