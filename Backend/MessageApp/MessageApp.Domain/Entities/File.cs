using MessageApp.Domain.Entities.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace MessageApp.Domain.Entities; 
public class File : BaseEntity
{
    public string Name { get; set; }
    public string Storage { get; set; }
    public string Path { get; set; }
    [NotMapped]
    public override DateTime? UpdatedDate { get => base.UpdatedDate; set => base.UpdatedDate = value; }
}
