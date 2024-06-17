using System.ComponentModel.DataAnnotations;

namespace my_web_server.DTOs
{
    public class AdminDto
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}
