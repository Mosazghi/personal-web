using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using my_web_server.DTOs;
using my_web_server.Models;
using my_web_server.Services;

namespace my_web_server.Controllers
{
    [Route("api/auth/login")]
    [ApiController]
    public class LoginController(IConfiguration config, LoginService loginservice) : ControllerBase
    {
        private readonly IConfiguration _config = config;

        private readonly LoginService _loginService = loginservice;

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] AdminDto adminDto)
        {
            IActionResult response = Unauthorized();
            Admin? admin = await _loginService.AuthenticateAdminAsync(adminDto);

            if (admin != null)
            {
                var tokenString = GenerateJSONWebToken(admin);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

        private string GenerateJSONWebToken(Admin admin)
        {
            var jwtIssuer = Environment.GetEnvironmentVariable("JwtIssuer");
            var jwtKey = Environment.GetEnvironmentVariable("JwtKey");
            var jwtAudience = Environment.GetEnvironmentVariable("JwtAudience");
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey ?? ""));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim> { new(JwtRegisteredClaimNames.Name, admin.Username), };

            var token = new JwtSecurityToken(
               jwtIssuer,
                jwtAudience,
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
