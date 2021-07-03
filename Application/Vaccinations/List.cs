using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vaccinations
{
    public class List
    {
          public class Query : IRequest<Result<List<Vaccination>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Vaccination>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<Vaccination>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Vaccination>>.Success(await _context.Vaccinations.ToListAsync(cancellationToken));
            }
        }
    }
}