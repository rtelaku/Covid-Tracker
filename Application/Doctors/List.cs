using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Doctors
{
    public class List
    {
        public class Query : IRequest<Result<List<Doctor>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Doctor>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<Doctor>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Doctor>>.Success(await _context.Doctors.ToListAsync(cancellationToken));
            }
        }
    }
}