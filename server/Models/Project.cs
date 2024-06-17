using System.Collections.Generic;
using my_web_server.DTOs;

namespace my_web_server.Models
{
    public class Project
    {
        public Project() { }

        public Project(ProjectDto projectDto)
        {
            Name = projectDto.Name;
            TechStack = projectDto.TechStack;
            Description = projectDto.Description;
            ShowcaseLink = projectDto.ShowcaseLink;
            RepositoryLink = projectDto.RepositoryLink;
            PreviewLink = projectDto.PreviewLink;
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ShowcaseLink { get; set; }
        public string? RepositoryLink { get; set; }
        public string? PreviewLink { get; set; }
        public List<string>? TechStack { get; set; }
    }
}
