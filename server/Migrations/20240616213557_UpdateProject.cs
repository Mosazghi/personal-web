using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace my_web_server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UrlLink",
                table: "Projects",
                newName: "ShowcaseLink");

            migrationBuilder.AddColumn<string>(
                name: "PreviewLink",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RepositoryLink",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreviewLink",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "RepositoryLink",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "ShowcaseLink",
                table: "Projects",
                newName: "UrlLink");
        }
    }
}
