using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using my_web_server.DTOs;
using my_web_server.Models;
using my_web_server.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace my_web_server.Controllers
{
    [Route("api/Auth/Login")]
    [ApiController]
    public class LoginController(IConfiguration config, LoginService loginservice) : ControllerBase
    {
        /// <summary>
        /// For reading configuration data.
        /// </summary>
        private readonly IConfiguration _config = config;

        /// <summary>
        /// Login service. 
        /// </summary>
        private readonly LoginService _loginService = loginservice;

        /// <summary>
        /// Authenticates an admin. 
        /// </summary>
        /// <param name="adminDto">Admin data</param>
        /// <returns></returns>
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

        /// <summary>
        /// Generates a JSON Web Token.
        /// </summary>
        /// <param name="admin">Admin data, only the username is used.</param>
        /// <returns></returns>
        private string GenerateJSONWebToken(Admin admin)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Name, admin.Username),
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

