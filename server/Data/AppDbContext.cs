using Microsoft.EntityFrameworkCore;
using my_web_server.Models;

namespace my_web_server.Data
{
    /// <summary>
    /// This class is used to connect to the database and access the tables.
    /// </summary>
    /// <param name="options">Pass onto DbContext</param>
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Course> Courses { get; set; }
        public DbSet<Admin> Admins { get; set; }
    }
}
