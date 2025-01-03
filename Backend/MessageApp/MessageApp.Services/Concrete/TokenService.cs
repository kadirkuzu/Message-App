﻿using MessageApp.Domain.Entities;
using MessageApp.Dto.User;
using MessageApp.Services.Abstract;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace MessageApp.Services.Concrete;

public class TokenService : ITokenService
{
    readonly IConfiguration _configuration;
    readonly UserManager<User> _userManager;

    public TokenService(IConfiguration configuration, UserManager<User> userManager)
    {
        _configuration = configuration;
        _userManager = userManager;
    }

    public async Task<UserToken> CreateAccessToken(User user)
    {
        var token = new UserToken();

        SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(_configuration["Token:SecurityKey"]!));

        SigningCredentials signingCredentials = new(securityKey, SecurityAlgorithms.HmacSha256);

        token.Expiration = DateTime.UtcNow.AddDays(1);

        var claims = new List<Claim>
            {
                new (ClaimTypes.Email,user.Email!),
                new (ClaimTypes.MobilePhone,user.PhoneNumber!),
                new (ClaimTypes.Name,user.FullName),
                new (ClaimTypes.NameIdentifier, user.Id.ToString()),
                new ("userName", user.UserName!),
                new (ClaimsIdentity.DefaultRoleClaimType, "User"),
            };

        var userRoles = await _userManager.GetRolesAsync(user);
        foreach (var userRole in userRoles)
        {
            claims.Add(new Claim(ClaimTypes.Role, userRole));
        }

        JwtSecurityToken securityToken = new JwtSecurityToken(
                audience: _configuration["Token:Audience"],
                issuer: _configuration["Token:Issuer"],
                expires: token.Expiration,
                notBefore: DateTime.UtcNow,
                signingCredentials: signingCredentials,
                claims: claims
            );

        JwtSecurityTokenHandler tokenHandler = new();

        token.AccessToken = tokenHandler.WriteToken(securityToken);

        token.RefreshToken = CreateRefreshToken();

        return token;
    }

    public string CreateRefreshToken()
    {
        byte[] number = new byte[32];
        using RandomNumberGenerator random = RandomNumberGenerator.Create();
        random.GetBytes(number);
        return Convert.ToBase64String(number);
    }
}
