namespace MessageApp.Dto.User; 

public class UserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string FullName { get; set; }
    public string UserName { get; set; }
    public bool HasPhoto { get; set; }

    public UserDto()
    {
        
    }

    public UserDto(Domain.Entities.User user)
    {
        Id = user.Id;
        Email = user.Email;
        PhoneNumber = user.PhoneNumber;
        FullName = user.FullName;
        UserName = user.UserName;
        HasPhoto = user.HasPhoto;
    }
}
