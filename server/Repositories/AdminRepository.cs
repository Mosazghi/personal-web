using Microsoft.EntityFrameworkCore;
using my_web_server.Data;
using my_web_server.DTOs;
using my_web_server.Models;

namespace my_web_server.Repositries
{
    /// <summary>
    /// This interface is used to access the Admin table in the database.
    /// </summary>
    public interface IAdminRepository

    {
        /// <summary>
        /// This method is used to get an admin from the database.
        /// </summary>
        /// <param name="adminDto">Admin data</param>
        /// <returns>Admin object if found</returns>
        Task<Admin?> GetAdminAsync(AdminDto adminDto);
    }

    /// <summary>
    /// This class is used to access the Admin table in the database.
    /// </summary>
    /// <param name="context">Database context</param>
    public class AdminRepository(AppDbContext context) : IAdminRepository
    {
        private readonly AppDbContext _context = context;

        /// <summary>
        /// This method is used to get an admin from the database.
        /// </summary>
        /// <param name="adminDto">Admin data</param>
        /// <returns>Admin object if found</returns>
        public async Task<Admin?> GetAdminAsync(AdminDto adminDto)
        {
            return await _context.Admins.FirstOrDefaultAsync(a => a.Username == adminDto.Username);
        }
    }
}
