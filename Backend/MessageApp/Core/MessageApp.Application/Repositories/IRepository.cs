using MessageApp.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace MessageApp.Application.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        DbSet<T> Table { get; }
    }
}
