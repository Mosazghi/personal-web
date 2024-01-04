using Microsoft.EntityFrameworkCore;
using my_web_server.Data;
using my_web_server.DTOs;
using my_web_server.Models;

namespace my_web_server.Repositries
{
    /// <summary>
    /// This interface is used to access the Course table in the database.
    /// </summary>
    public interface ICourseRepository
    {
        /// <summary>
        /// This method is used to get all courses from the database.
        /// </summary>
        /// <returns>All courses into a list</returns>
        Task<List<Course>> GetAllCoursesAsync();

        /// <summary>
        /// This method is used to create a course in the database.
        /// </summary>
        /// <param name="courseDto">Course data</param>
        /// <returns>Given course if found</returns>
        Task<Course> CreateCourseAsync(CourseDto courseDto);
    }

    /// <summary>
    /// This class is used to access the Course table in the database.
    /// </summary>
    /// <param name="context">Database context</param>
    public class CourseRepository(AppDbContext context) : ICourseRepository
    {
        private readonly AppDbContext _context = context;

        /// <summary>
        /// This method is used to get all courses from the database.
        /// </summary>
        /// <returns>All courses into a list</returns>
        public async Task<List<Course>> GetAllCoursesAsync()
        {
            return await _context.Courses.ToListAsync();
        }

        /// <summary>
        /// This method is used to create a course in the database.
        /// </summary>
        /// <param name="courseDto">Course dto</param>
        /// <returns>Given course if found</returns>
        public async Task<Course> CreateCourseAsync(CourseDto courseDto)
        {
            Course course = new(courseDto);
            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();
            return course;
        }
    }
}
