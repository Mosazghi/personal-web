using Microsoft.EntityFrameworkCore;
using my_web_server.Models;

namespace my_web_server.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Project> Projects { get; set; }
    }
}
