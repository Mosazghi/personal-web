using Microsoft.EntityFrameworkCore;
using my_web_server.Data;
using my_web_server.DTOs;
using my_web_server.Models;

namespace my_web_server.Repositries
{
    public interface IAdminRepository
    {
        Task<Admin?> GetAdminAsync(AdminDto adminDto);
    }

    public class AdminRepository(AppDbContext context) : IAdminRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<Admin?> GetAdminAsync(AdminDto adminDto)
        {
            return await _context.Admins.FirstOrDefaultAsync(a => a.Username == adminDto.Username);
        }
    }
}
