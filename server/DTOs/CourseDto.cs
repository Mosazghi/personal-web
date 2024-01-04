using System.ComponentModel.DataAnnotations;

namespace my_web_server.DTOs
{
    /// <summary>
    /// This class is used to transfer data from the client to the server.
    /// </summary>
    public class CourseDto
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        [RegularExpression(@"2\d{1}-H[1-2]", ErrorMessage = "Semester must be in the format '2*-H*' where * represents digits.")]
        public string? Semester { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        [RegularExpression(@"^(Passed|Failed|[ABCDE])$", ErrorMessage = "Course grade must be 'Passed', 'Failed', 'A', 'B', 'C', 'D' or 'E'.")]
        public string? Grade { get; set; }

        [Required]
        [Url]
        public string? UrlLink { get; set; }

        [Required]
        [RegularExpression(@"^[OE]$", ErrorMessage = "Course type must be 'O'(obligatory) or 'E' (additonal).")]
        public char? Type { get; set; }
    }
}
