using my_web_server.DTOs;
using my_web_server.Models;
using my_web_server.Repositries;

namespace my_web_server.Services
{
    /// <summary>
    /// This class is used to handle the business logic for the Admin table.
    /// </summary>
    /// <param name="adminRepository">For database access</param>
    public class LoginService(IAdminRepository adminRepository)
    {
        private readonly IAdminRepository _adminRepository = adminRepository;

        /// <summary>
        /// This method is used to authenticate an admin.
        /// </summary>
        /// <param name="adminDto">Admin data</param>
        /// <returns>Given admin if authenticated</returns>
        public async Task<Admin?> AuthenticateAdminAsync(AdminDto adminDto)
        {
            Admin? admin = await _adminRepository.GetAdminAsync(adminDto);

            if (admin is null || admin.Password != adminDto.Password)
            {
                return null;
            }
            return admin;
        }
    }
}
