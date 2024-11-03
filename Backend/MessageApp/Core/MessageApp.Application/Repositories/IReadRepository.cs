
using MessageApp.Domain.Entities.Common;
using System.Linq.Expressions;

namespace MessageApp.Application.Repositories
{
    public interface IReadRepository<T> : IRepository<T> where T : BaseEntity
    {
        IQueryable<T> GetAll();
        IQueryable<T> GetWhere(Expression<Func<T,bool>> method) ;
        Task<T> GetFirstAsync(Expression<Func<T, bool>> method);
        Task<T> GetByIdAsync(Guid id);
    }
}
