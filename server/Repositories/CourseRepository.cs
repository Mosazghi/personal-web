using Microsoft.EntityFrameworkCore;
using my_web_server.Data;
using my_web_server.DTOs;
using my_web_server.Models;

namespace my_web_server.Repositries
{
    public interface ICourseRepository
    {
        Task<Course?> GetCourseByIdAsync(int id);
        Task<List<Course?>> GetAllCoursesAsync();
        Task<Course?> CreateCourseAsync(Course courseDto);
        Task<Course?> UpdateCourseAsync(int id, Course? course);
        Task<Course?> DeleteCourseAsync(int id, Course? course);
    }

    public class CourseRepository(AppDbContext context) : ICourseRepository
    {
        public async Task<Course?> GetCourseByIdAsync(int id)
        {
            return await context.Courses.FindAsync(id);
        }

        public async Task<List<Course?>> GetAllCoursesAsync()
        {
            return await context.Courses.ToListAsync();
        }

        public async Task<Course?> CreateCourseAsync(Course course)
        {
            await context.Courses.AddAsync(course);
            await context.SaveChangesAsync();
            return course;
        }

        public async Task<Course?> UpdateCourseAsync(int id, Course? course)
        {
            context.Courses.Update(course);
            await context.SaveChangesAsync();
            return course;
        }

        public async Task<Course?> DeleteCourseAsync(int id, Course? course)
        {
            context.Courses.Remove(course);
            await context.SaveChangesAsync();
            return course;
        }
    }
}
