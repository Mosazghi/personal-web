using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using my_web_server.DTOs;
using my_web_server.Models;
using my_web_server.Services;

namespace my_web_server.Controllers
{
    [Route("api/Course")]
    [ApiController]
    public class CourseController(CourseService courseService) : ControllerBase
    {
        /// <summary>
        /// Course service.
        /// </summary>
        private readonly CourseService _courseService = courseService;

        /// <summary>
        /// Gets all courses. 
        /// </summary>
        /// <returns> All courses if there are any. </returns>
        [HttpGet("GetCourses")]
        public async Task<IActionResult> GetCoursesAsync()
        {
            List<Course>? courses = await _courseService.GetCoursesAsync();

            if (courses.IsNullOrEmpty())
            {
                return NotFound(new { Message = "There are no courses available" });
            }
            return Ok(courses);
        }

        /// <summary>
        /// Creates a new course.
        /// </summary>
        /// <param name="courseDto">Course data</param>
        /// <returns> HTTP Response message </returns>
        [HttpPost("CreateCourse")]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] CourseDto courseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Course createdCourse = await _courseService.CreateCourseAsync(courseDto);

            return Ok(new { Message = $"{createdCourse.Name} created successfully." });
        }

    }
}
