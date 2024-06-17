using my_web_server.DTOs;
using my_web_server.Models;
using my_web_server.Repositries;

namespace my_web_server.Services
{
    public class CourseService(ICourseRepository courseRepository)
    {
        public async Task<List<Course?>> GetCoursesAsync()
        {
            return await courseRepository.GetAllCoursesAsync();
        }

        public async Task<Course?> CreateCourseAsync(CourseDto courseDto)
        {
            var course = new Course(courseDto);
            return await courseRepository.CreateCourseAsync(course);
        }

        public async Task<Course?> UpdateCourseAsync(int id, CourseDto courseDto)
        {
            var course = await courseRepository.GetCourseByIdAsync(id);
            if (course == null)
            {
                return null;
            }

            course.Name = courseDto.Name;
            course.Description = courseDto.Description;
            course.Semester = courseDto.Semester;
            course.Type = courseDto.Type;
            course.Grade = courseDto.Grade;
            course.Description = courseDto.Description;
            course.UrlLink = courseDto.UrlLink;

            return await courseRepository.UpdateCourseAsync(id, course);
        }

        public async Task<Course?> DeleteCourseAsync(int id)
        {
            var course = await courseRepository.GetCourseByIdAsync(id);

            if (course == null)
            {
                return null;
            }
            return await courseRepository.DeleteCourseAsync(id, course);
        }
    }
}
