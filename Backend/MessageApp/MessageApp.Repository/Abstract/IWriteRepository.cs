

using MessageApp.Domain.Entities.Common;

namespace MessageApp.Repository.Abstract;
public interface IWriteRepository<T> : IRepository<T> where T : BaseEntity
{
    Task<bool> AddAsync(T entity);
    Task<bool> AddRangeAsync(List<T> entities);
    Task<bool> RemoveAsync(Guid id);
    Task<bool> RemoveRangeAsync(List<Guid> ids);
    bool Remove(T entity);
    bool RemoveRange(List<T> entities);
    bool Update(T entity);
    Task<int> SaveAsync();
}
