using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace my_web_server.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CrouseURLLink",
                table: "Courses",
                newName: "URLLink");

            migrationBuilder.RenameColumn(
                name: "CourseType",
                table: "Courses",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "CourseSemester",
                table: "Courses",
                newName: "Semester");

            migrationBuilder.RenameColumn(
                name: "CourseName",
                table: "Courses",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "CourseGrade",
                table: "Courses",
                newName: "Grade");

            migrationBuilder.RenameColumn(
                name: "CourseDescription",
                table: "Courses",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "AdminPassword",
                table: "Admins",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "AdminName",
                table: "Admins",
                newName: "Password");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "URLLink",
                table: "Courses",
                newName: "CrouseURLLink");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Courses",
                newName: "CourseType");

            migrationBuilder.RenameColumn(
                name: "Semester",
                table: "Courses",
                newName: "CourseSemester");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Courses",
                newName: "CourseName");

            migrationBuilder.RenameColumn(
                name: "Grade",
                table: "Courses",
                newName: "CourseGrade");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Courses",
                newName: "CourseDescription");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Admins",
                newName: "AdminPassword");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Admins",
                newName: "AdminName");
        }
    }
}
