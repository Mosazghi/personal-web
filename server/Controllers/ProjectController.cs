using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using my_web_server.DTOs;
using my_web_server.Services;

namespace my_web_server.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectController(ProjectService projectService) : ControllerBase
    {
        private readonly ProjectService _projectService = projectService;

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();

            if (projects == null)
            {
                return NotFound(new { Message = "There are no projects available" });
            }

            return Ok(projects);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateProject([FromBody] ProjectDto projectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdProject = await _projectService.CreateProjectAsync(projectDto);

            if (createdProject == null)
            {
                return BadRequest(new { Message = "Project already exist." });
            }

            return Ok(new { Message = $"{createdProject.Name} created successfully." });
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteProject(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var deletedProject = await _projectService.DeleteProjectAsync(id);

            if (deletedProject == null)
            {
                return NotFound(new { Message = "Project not found." });
            }

            return Ok(new { Message = $"{deletedProject.Name} updated successfully." });
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] ProjectDto projectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedProject = await _projectService.UpdateProjectAsync(id, projectDto);

            if (updatedProject == null)
            {
                return NotFound(new { Message = "Project not found." });
            }

            return Ok(new { Message = $"{updatedProject.Name} updated successfully." });
        }
    }
}
