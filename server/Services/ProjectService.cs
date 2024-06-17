using my_web_server.DTOs;
using my_web_server.Models;
using my_web_server.Repositries;

namespace my_web_server.Services
{
    public class ProjectService(IProjectRepository projectRepository)
    {
        public async Task<List<Project?>> GetAllProjectsAsync()
        {
            return await projectRepository.GetAllProjectsAsync();
        }

        public async Task<Project?> CreateProjectAsync(ProjectDto projectDto)
        {
            var project = new Project(projectDto);
            return await projectRepository.CreateProjectAsync(project);
        }

        public async Task<Project?> UpdateProjectAsync(int id, ProjectDto projectDto)
        {
            var project = await projectRepository.GetProjectByIdAsync(id);
            if (project == null)
            {
                return null;
            }
            project.Name = projectDto.Name;
            project.TechStack = projectDto.TechStack;
            project.Description = projectDto.Description;
            project.ShowcaseLink = projectDto.ShowcaseLink;
            project.RepositoryLink = projectDto.RepositoryLink;
            project.PreviewLink = projectDto.PreviewLink;
            return await projectRepository.UpdateProjectAsync(id, project);
        }

        public async Task<Project?> DeleteProjectAsync(int id)
        {
            var project = await projectRepository.GetProjectByIdAsync(id);
            if (project == null)
            {
                return null;
            }
            return await projectRepository.DeleteProjectAsync(id, project);
        }
    }
}
