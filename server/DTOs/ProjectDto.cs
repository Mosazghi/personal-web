using System.ComponentModel.DataAnnotations;

namespace my_web_server.DTOs
{
    public class ProjectDto
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public List<string>? TechStack { get; set; }

        [Required]
        [Url]
        public string? ShowcaseLink { get; set; }

        [Required]
        [Url]
        public string? RepositoryLink { get; set; }

        [Required]
        [Url]
        public string? PreviewLink { get; set; }
    }
}
