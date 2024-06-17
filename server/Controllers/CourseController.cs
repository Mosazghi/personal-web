using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using my_web_server.DTOs;
using my_web_server.Models;
using my_web_server.Services;

namespace my_web_server.Controllers
{
    [Route("api/courses")]
    [ApiController]
    public class CourseController(CourseService courseService) : ControllerBase
    {
        private readonly CourseService _courseService = courseService;

        [HttpGet]
        public async Task<IActionResult> GetCourses()
        {
            List<Course?> courses = await _courseService.GetCoursesAsync();

            if (courses.IsNullOrEmpty())
            {
                return NotFound(new { Message = "There are no courses available" });
            }

            return Ok(courses);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCourse([FromBody] CourseDto courseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Course? createdCourse = await _courseService.CreateCourseAsync(courseDto);

            return Ok(new { Message = $"{createdCourse.Name} created successfully." });
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var deletedCourse = await _courseService.DeleteCourseAsync(id);

            if (deletedCourse == null)
            {
                return NotFound(new { Message = "Course not found." });
            }

            return Ok(new { Message = $"{deletedCourse.Name} updated successfully." });
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] CourseDto courseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedCourse = await _courseService.UpdateCourseAsync(id, courseDto);

            if (updatedCourse == null)
            {
                return NotFound(new { Message = "Course not found." });
            }

            return Ok(new { Message = $"{courseDto.Name} updated successfully." });
        }
    }
}
