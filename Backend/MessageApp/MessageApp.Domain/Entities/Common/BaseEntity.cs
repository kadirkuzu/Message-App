namespace MessageApp.Domain.Entities.Common
{
    public class BaseEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        virtual public DateTime? UpdatedDate { get; set; }
    }
}
