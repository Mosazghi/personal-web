using System.ComponentModel.DataAnnotations;

namespace my_web_server.DTOs
{
    /// <summary>
    /// This class is used to transfer data from the client to the server. 
    /// </summary>
    public class AdminDto
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
