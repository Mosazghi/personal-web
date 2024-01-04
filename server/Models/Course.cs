using my_web_server.DTOs;

namespace my_web_server.Models
{
    /// <summary>
    /// This class is used to represent the Course table in the database.
    /// </summary>
    public class Course
    {
        public Course()
        {
        }

        /// <summary>
        /// This constructor is used to convert a CourseDto to a Course.
        /// </summary>
        /// <param name="courseDto">Course data</param>
        public Course(CourseDto courseDto)
        {
            Name = courseDto.Name;
            Semester = courseDto.Semester;
            Description = courseDto.Description;
            Grade = courseDto.Grade;
            UrlLink = courseDto.UrlLink;
            Type = courseDto.Type;
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Semester { get; set; }
        public string? Description { get; set; }
        public string? Grade { get; set; }
        public string? UrlLink { get; set; }
        public char? Type { get; set; }

    }
}
