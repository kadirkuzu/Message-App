﻿namespace MessageApp.Dto.User;

public class UserToken
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public DateTime Expiration { get; set; }
}
