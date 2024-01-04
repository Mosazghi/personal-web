using my_web_server.DTOs;
using my_web_server.Models;
using my_web_server.Repositries;

namespace my_web_server.Services
{
    /// <summary>
    /// This class is used to handle the business logic for the Course table.
    /// </summary>
    /// <param name="courseRepository">For database access</param>
    public class CourseService(ICourseRepository courseRepository)
    {
        private readonly ICourseRepository _courseRepository = courseRepository;

        /// <summary>
        ///  Fetches all courses from the database
        /// </summary>
        /// <returns> All courses into a list </returns>
        public async Task<List<Course>> GetCoursesAsync()
        {
            return await _courseRepository.GetAllCoursesAsync();
        }

        /// <summary>
        /// Creates a course in the database
        /// </summary>
        /// <param name="courseDto">Course data</param>
        /// <returns>Given course if found</returns>
        public async Task<Course> CreateCourseAsync(CourseDto courseDto)
        {
            return await _courseRepository.CreateCourseAsync(courseDto);
        }

    }

}
