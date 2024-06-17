using my_web_server.DTOs;

namespace my_web_server.Models
{
    public class Course
    {
        public Course() { }

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
