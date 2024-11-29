using MessageApp.Domain.Entities.Common;

namespace MessageApp.Repository.Abstract; 
public interface IRepository<T> where T : BaseEntity
{
    DbSet<T> Table { get; }
}
