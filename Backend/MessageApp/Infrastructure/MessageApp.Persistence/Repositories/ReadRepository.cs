using MessageApp.Application.Repositories;
using MessageApp.Domain.Entities.Common;
using MessageApp.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MessageApp.Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
    {
        private readonly MessageAppDbContext _context;

        public ReadRepository(MessageAppDbContext context)
        {
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();

        public IQueryable<T> GetAll() => Table;

        public IQueryable<T> GetWhere(Expression<Func<T, bool>> method) => Table.Where(method);
        public async Task<T> GetFirstAsync(Expression<Func<T, bool>> method) => await Table.FirstOrDefaultAsync(method);

        public async Task<T> GetByIdAsync(Guid id) => await Table.FindAsync(id);
    }
}
