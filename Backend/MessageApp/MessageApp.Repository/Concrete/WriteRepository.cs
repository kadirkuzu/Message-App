using MessageApp.Domain.Entities.Common;
using MessageApp.Repository.Abstract;
using MessageApp.Repository.Concrete.Contexts;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MessageApp.Repository.Concrete
{
    public class WriteRepository<T> : IWriteRepository<T> where T : BaseEntity
    {
        private readonly MessageAppDbContext _context;

        public WriteRepository(MessageAppDbContext context)
        {
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();

        public async Task<bool> AddAsync(T entity)
        {
            EntityEntry<T> entityEntry = await Table.AddAsync(entity);
            return entityEntry.State == EntityState.Added;
        }

        public async Task<bool> AddRangeAsync(List<T> entities)
        {
            await _context.AddRangeAsync(entities);
            return true;
        }

        public bool Remove(T entity)
        {
            EntityEntry<T> entityEntry = Table.Remove(entity);
            return entityEntry.State == EntityState.Deleted;
        }
        public bool RemoveRange(List<T> entities)
        {
            Table.RemoveRange(entities);
            return true;
        }
        public async Task<bool> RemoveAsync(Guid id)
        {
            T entity = await Table.FirstOrDefaultAsync(data => data.Id == id);
            return Remove(entity);
        }
        public async Task<bool> RemoveRangeAsync(List<Guid> ids)
        {
            List<T> entities = await Table.Where(data => ids.Contains(data.Id)).ToListAsync();
            return RemoveRange(entities);
        }

        public bool Update(T entity)
        {
            EntityEntry<T> entityEntry = Table.Update(entity);
            return entityEntry.State == EntityState.Modified;
        }
        public async Task<int> SaveAsync() => await _context.SaveChangesAsync();
    }
}
