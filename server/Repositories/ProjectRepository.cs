using Microsoft.EntityFrameworkCore;
using my_web_server.Data;
using my_web_server.DTOs;
using my_web_server.Models;

namespace my_web_server.Repositries
{
    public interface IProjectRepository
    {
        Task<Project?> GetProjectByIdAsync(int id);
        Task<List<Project?>> GetAllProjectsAsync();
        Task<Project?> CreateProjectAsync(Project project);
        Task<Project?> UpdateProjectAsync(int id, Project? project);
        Task<Project?> DeleteProjectAsync(int id, Project? project);
    }

    public class ProjectRepository(AppDbContext context) : IProjectRepository
    {
        public async Task<Project?> GetProjectByIdAsync(int id)
        {
            return await context.Projects.FindAsync(id);
        }

        public async Task<List<Project?>> GetAllProjectsAsync()
        {
            return await context.Projects.ToListAsync();
        }

        public async Task<Project?> CreateProjectAsync(Project project)
        {
            await context.Projects.AddAsync(project);
            await context.SaveChangesAsync();
            return project;
        }

        public async Task<Project?> UpdateProjectAsync(int id, Project? project)
        {
            context.Projects.Update(project);
            await context.SaveChangesAsync();
            return project;
        }

        public async Task<Project?> DeleteProjectAsync(int id, Project? project)
        {
            context.Projects.Remove(project);
            await context.SaveChangesAsync();
            return project;
        }
    }
}
