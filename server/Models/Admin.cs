namespace my_web_server.Models
{
    /// <summary>
    /// This class is used to represent the Admin table in the database.
    /// </summary>
    public class Admin
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
